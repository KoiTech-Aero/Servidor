import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaError } from "../entidades/prismaError.js";
import { PrismaNormaRepository } from "../repositories/prisma/PrismaNormaRepository.js";
import { DeleteNorma } from "../services/deleteNorma.js";

const schema = {
	params: z.object({
		id: z.string(),
	}),
};

export const deleteNorma: FastifyPluginCallbackZod = (fastify) => {
	fastify.delete("/normas/:id", { schema }, async (request, reply) => {
		const { id } = request.params;

		try {
			const nRepo = new PrismaNormaRepository();
			const nService = new DeleteNorma(nRepo, fastify);

			const deleteResponse = await nService.execute(id);
			return deleteResponse;
		} catch (e) {
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
