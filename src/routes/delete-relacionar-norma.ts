import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaNormaReferenciaRepository } from "../repositories/prisma/PrismaNormaReferenciaRepository.js";
import { DeleteNorma } from "../services/deleteNorma.js";
import { PrismaError } from "../entidades/prismaError.js";

const schema = {
    params: z.object({
        id: z.string(),
        relacionadaId: z.string(),
    }),
};

export const deleteRelacionarNorma: FastifyPluginAsyncZod = async (fastify) => {
    fastify.delete(
        "/normas/:id/desassociar/:relacionadaId",
        { schema },
        async (request, reply) => {
            const { id, relacionadaId } = request.params;

            try {
                const repo = new PrismaNormaReferenciaRepository();
                const service = new DeleteNorma(repo, fastify);

                const result = await service.execute({
                    id_norma_referencia: id,
                    id_norma_referenciada: relacionadaId,
                });

                return reply.status(200).send(result);
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
        }
    );
};