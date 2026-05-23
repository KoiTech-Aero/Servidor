import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaNormaRepository } from "../repositories/prisma/PrismaNormaRepository.js";
import { ReadNorma } from "../services/readNorma.js";

const schema = {
	params: z.object({
		conditions: z.stringbool().optional(),
	}),
};

export const getNorma: FastifyPluginAsyncZod = async (fastify) => {
	fastify.get("/normas/:conditions?", { schema }, async (request, reply) => {
		const { conditions } = request.params;
		const prismaNormaRepository = new PrismaNormaRepository();
		const readNorma = new ReadNorma(prismaNormaRepository, fastify);

		try {
			const normas = await readNorma.execute({
				status: conditions !== undefined ? conditions : null,
			});
			if (normas) reply.code(200).send(normas);
		} catch (e) {
			if (e instanceof Error) {
				return reply.code(500).send({ typeError: e.name, message: e.message });
			}
		}
	});
};
