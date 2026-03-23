import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z, { any } from "zod";
import { PrismaNormaRepository } from "../repositories/prisma/PrismaNormaRepository.js";
import { CreateNorma } from "../services/createNorma.js";

const postNormaSchema = {
	body: z.object({
		codigo: z.string().max(255),
		titulo: z.string().max(100),
		area_tecnica: z.string().max(50),
		orgao_emissor: z.string().max(50),
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
				return reply.status(500).send({
					message: "Erro interno ao salvar a norma.",
					error: err,
				});
			}
		},
	);
};
