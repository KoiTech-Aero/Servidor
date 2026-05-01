import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import fs from "fs";
import { unlink } from "fs/promises";
import path from "path";
import { pipeline } from "stream/promises";
import { z } from "zod";
import { PrismaError } from "../entidades/prismaError.js";
import { PrismaVersaoRepository } from "../repositories/prisma/PrismaVersaoRepository.js";
import { CreateVersao } from "../services/createVersao.js";

const bodySchema = z.object({
	id_norma: z.string().min(1),
	versao_numero: z.string().min(1),
	descricao: z.string(),
	status: z.enum(["true", "false"]).optional(),
	data_publicacao: z.string(),
});

export const postVersao: FastifyPluginAsyncZod = async (fastify) => {
	fastify.post("/addVersao", async (request, reply) => {
		const parts = request.parts();

		const data: any = {};
		let filePath = "";

		const uploadDir = path.join(process.cwd(), "uploads");
		let fileName: string = "";

		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		try {
			for await (const part of parts) {
				if (part.type === "file") {
					fileName = `${Date.now()}-${part.filename}`;
					const uploadPath = path.join(process.cwd(), "uploads", fileName);

					await pipeline(part.file, fs.createWriteStream(uploadPath));

					filePath = `/uploads/${fileName}`;
				} else {
					data[part.fieldname] = part.value;
				}
			}
		} catch (e) {
			await unlink(path.join(uploadDir, fileName));
			throw e;
		}

		const parsed = bodySchema.safeParse(data);

		if (!parsed.success) return reply.code(400).send(parsed.error);

		try {
			const prismaVersaoRepository = new PrismaVersaoRepository();
			const createVersao = new CreateVersao(prismaVersaoRepository, fastify);

			const versao = await createVersao.execute({
				id_norma: parsed.data.id_norma,
				versao_numero: parsed.data.versao_numero,
				descricao: parsed.data.descricao,
				data_publicacao: new Date(data.data_publicacao),
				status: parsed.data.status === "true",
				path_file: filePath,
			});

			return reply.status(201).send(versao);
		} catch (e) {
			await unlink(path.join(uploadDir, fileName));

			if (e instanceof PrismaError) {
				const typeError = e.typeError;
				const message = e.message;

				if (e.responseStatusCode === 409)
					return reply.status(409).send({ typeError, message });
			}

			if (e instanceof Error) {
				return reply.code(500).send({ typeError: e.name, message: e.message });
			}
		}
	});
};
