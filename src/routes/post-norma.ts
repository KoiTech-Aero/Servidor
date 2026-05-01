import fs from "node:fs";
import { unlink } from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream/promises";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaError } from "../entidades/prismaError.js";
import { PrismaNormaRepository } from "../repositories/prisma/PrismaNormaRepository.js";
import { CreateNorma } from "../services/createNorma.js";

const bodySchema = z.object({
	codigo: z.string(),
	titulo: z.string(),
	escopo: z.string(),
	area_tecnica: z.string(),
	orgao_emissor: z.string(),
	versao_numero: z.string(),
	descricao: z.string(),
	data_publicacao: z.coerce.date(),
	status: z.coerce.boolean(),
});

export const postNorma: FastifyPluginAsyncZod = async (fastify) => {
	fastify.post("/addNorma", async (request, reply) => {
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
					const uploadPath = path.join(uploadDir, fileName);

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
			const prismaNormaRepository = new PrismaNormaRepository();
			const createNorma = new CreateNorma(prismaNormaRepository, fastify);

			const result = await createNorma.execute({
				norma: {
					codigo: parsed.data.codigo,
					titulo: parsed.data.titulo,
					escopo: parsed.data.escopo,
					area_tecnica: parsed.data.area_tecnica,
					orgao_emissor: parsed.data.orgao_emissor,
				},
				versao: {
					versao_numero: parsed.data.versao_numero,
					descricao: parsed.data.descricao,
					data_publicacao: new Date(parsed.data.data_publicacao),
					status: parsed.data.status,
					path_file: filePath,
				},
			});

			return reply.status(201).send(result);
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
