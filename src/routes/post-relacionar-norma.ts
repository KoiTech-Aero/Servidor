import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaError } from "../entidades/prismaError.js";
import { PrismaNormaReferenciaRepository } from "../repositories/prisma/PrismaNormaReferenciaRepository.js";
import { AssociateNorma } from "../services/associateNorma.js";

const schema = {
	params: z.object({
		id: z.string(),
	}),
	body: z.object({
		referencias: z.array(
		z.object({
			id_norma_referenciada: z.string(),
			observacao: z.string().optional(),
		}),
	),
	})
	
};

export const postRelacionarNorma: FastifyPluginAsyncZod = async (fastify) => {
	fastify.post("/normas/:id/associar", { schema }, async (request, reply) => {
		const { id } = request.params;
		const {referencias} = request.body;

		try {
			const repo = new PrismaNormaReferenciaRepository();
			const service = new AssociateNorma(repo, fastify);

			const result = await service.execute({
				id_norma_referencia: id,
				referencias: referencias,
			});

			return reply.status(201).send(result);
		} catch (e) {
			if (e instanceof PrismaError) {
				return reply
					.status(e.responseStatusCode)
					.send({ typeError: e.typeError, message: e.message });
			}

			if (e instanceof Error) {
				return reply
					.status(500)
					.send({ typeError: e.name, message: e.message });
			}
		}
	});
};
