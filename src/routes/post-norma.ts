import { env } from "node:process";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaNormaRepository } from "../repositories/prisma/PrismaNormaRepository.js";
import { CreateNorma } from "../services/createNorma.js";

const postNormaSchema = {
	body: z.object({
		norma: z.object({
			codigo: z.string(),
			titulo: z.string(),
			escopo: z.string(),
			area_tecnica: z.string(),
			orgao_emissor: z.string(),
		}),
		versao: z.object({
			versao_numero: z.string(),
			descricao: z.string(),
			data_publicacao: z.coerce.date(),
			path_file: z.url(),
			status: z.boolean(),
		}),
	}),
	response: {
		201: z.object({
			id: z.uuid(),
		}),
		500: z.any(),
	},
};

export const postNorma: FastifyPluginAsyncZod = async (fastify) => {
	fastify.post(
		"/addNorma",
		{
			schema: postNormaSchema,
		},
		async (request, reply) => {
			const dataNorma = request.body;
			const prismaNormaRepository = new PrismaNormaRepository();
			const createNorma = new CreateNorma(prismaNormaRepository, fastify);

			try {
				const norma = await createNorma.execute(dataNorma);
				reply.code(201).send(norma);
			} catch (err) {
				fastify.log.error(env.DATABASE_URL);
				fastify.log.error(err);
				return reply.status(500).send({
					message: "Erro interno ao salvar a norma.",
					error: err,
				});
			}
		},
	);
};
