import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaVersaoRepository } from "../repositories/prisma/PrismaVersaoRepository.js";
import { CreateVersao } from "../services/createVersao.js";
import { PrismaError } from "../entidades/prismaError.js";

const postVersaoSchema = {
    body: z.object({
        id_norma: z.string(),
        versao_numero: z.string(),
        descricao: z.string(),
        data_publicacao: z.coerce.date(),
        path_file: z.url(),
        status: z.boolean(),
    })
}

export const postVersao: FastifyPluginAsyncZod = async (fastify) => {
    fastify.post("/addVersao", { schema: postVersaoSchema }, async (request, reply) => {
        const versaoData = request.body

        try {
            const prismaVersaoRepository = new PrismaVersaoRepository()
            const createVersao = new CreateVersao(prismaVersaoRepository, fastify)

            const versao = await createVersao.execute(versaoData)
        } catch (e) {
            if (e instanceof PrismaError) {
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
    })
}