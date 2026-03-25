import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaInsertError } from "../entidades/prismaInsertError.js";
import { PrismaNormaRepository } from "../repositories/prisma/PrismaNormaRepository.js";
import { CreateNorma } from "../services/createNorma.js";

const errorSchema = z.object({
	typeError: z.string(),
	message: z.string(),
});

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
			id: z.string(),
		}),
		409: errorSchema,
		500: errorSchema,
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
				if (norma) reply.code(201).send(norma);
			} catch (e) {
				if (e instanceof PrismaInsertError) {
					const typeError = e.typeError;
					const message = e.message;

					if (e.responseStatusCode === 409)
						return reply.status(409).send({ typeError, message });
				}

				if (e instanceof Error) {
					return reply
						.code(500)
						.send({ typeError: e.name, message: e.message });
				}
			}
		},
	);
};
