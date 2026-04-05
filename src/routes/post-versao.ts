import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaVersaoRepository } from "../repositories/prisma/PrismaVersaoRepository.js";
import { CreateVersao } from "../services/createVersao.js";
import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";

export const postVersao: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post("/addVersao", async (request, reply) => {
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
        const uploadPath = path.join(process.cwd(), "uploads", fileName);

        await pipeline(part.file, fs.createWriteStream(uploadPath));

        filePath = `/uploads/${fileName}`;
      } else {
        data[part.fieldname] = part.value;
      }
    }

    try {
      const prismaVersaoRepository = new PrismaVersaoRepository();
      const createVersao = new CreateVersao(prismaVersaoRepository, fastify);

      const versao = await createVersao.execute({
        ...data,
        data_publicacao: new Date(data.data_publicacao),
        status: data.status === "true",
        path_file: filePath,
      });

      return reply.status(201).send(versao);
    } catch (e) {
      return reply.status(500).send(e);
    }
  });
};
