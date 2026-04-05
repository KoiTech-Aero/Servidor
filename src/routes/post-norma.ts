import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaNormaRepository } from "../repositories/prisma/PrismaNormaRepository.js";
import { CreateNorma } from "../services/createNorma.js";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export const postNorma: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post("/addNorma", async (request, reply) => {
    const parts = request.parts();

    let data: any = {};
    let filePath = "";

    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    for await (const part of parts) {
      if (part.type === "file") {
        const fileName = `${Date.now()}-${part.filename}`;
        const uploadPath = path.join(uploadDir, fileName);

        await pipeline(part.file, fs.createWriteStream(uploadPath));

        filePath = `/uploads/${fileName}`;
      } else {
        data[part.fieldname] = part.value;
      }
    }

    try {
      const prismaNormaRepository = new PrismaNormaRepository();
      const createNorma = new CreateNorma(prismaNormaRepository, fastify);

      const result = await createNorma.execute({
        norma: {
          codigo: data.codigo,
          titulo: data.titulo,
          escopo: data.escopo,
          area_tecnica: data.area_tecnica,
          orgao_emissor: data.orgao_emissor,
        },
        versao: {
          versao_numero: data.versao_numero,
          descricao: data.descricao,
          data_publicacao: new Date(data.data_publicacao),
          status: data.status === "true",
          path_file: filePath,
        },
      });

      return reply.status(201).send(result);
    } catch (e) {
      return reply.status(500).send(e);
    }
  });
};
