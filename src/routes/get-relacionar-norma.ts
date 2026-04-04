import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaNormaReferenciaRepository } from "../repositories/prisma/PrismaNormaReferenciaRepository.js";
import { ReadNormaReferencia } from "../services/readNormaReferencia.js";

const schema = {
    params: z.object({
        id: z.string(),
    }),
};

export const getRelacionarNorma: FastifyPluginAsyncZod = async (fastify) => {
    fastify.get(
        "/normas/:id/referencias",
        { schema },
        async (request, reply) => {
            const { id } = request.params;

            const repo = new PrismaNormaReferenciaRepository();
            const service = new ReadNormaReferencia(repo, fastify);

            const result = await service.execute(id);

            return reply.status(200).send(result);
        }
    );
};