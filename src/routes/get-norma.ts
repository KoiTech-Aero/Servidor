import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaNormaRepository } from "../repositories/prisma/PrismaNormaRepository.js";
import { ReadNorma } from "../services/readNorma.js";

export const getNorma: FastifyPluginAsyncZod = async (fastify) => {
	fastify.get("/normas", async (request, reply) => {
		const prismaNormaRepository = new PrismaNormaRepository();
		const readNorma = new ReadNorma(prismaNormaRepository, fastify);

		try {
			const normas = await readNorma.execute();
			if (normas) reply.code(201).send(normas);
		} catch (e) {
			if (e instanceof Error) {
				return reply.code(500).send({ typeError: e.name, message: e.message });
			}
		}
	});
};
