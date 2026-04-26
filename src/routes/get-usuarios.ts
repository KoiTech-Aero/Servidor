import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaUsuarioRepository } from "../repositories/prisma/PrismaUsuarioRepository.js";
import { ReadUsuario } from "../services/readUsuario.js";
import { PrismaError } from "../entidades/prismaError.js";

export const getUsuarios: FastifyPluginAsyncZod =
    async (fastify) => {
        fastify.get("/usuarios", async (_request, reply) => {
            try {
                const repo =
                    new PrismaUsuarioRepository();

                const service =
                    new ReadUsuario(repo, fastify);

                const usuarios =
                    await service.execute();

                return reply.status(200).send(usuarios);

            } catch (e) {
                if (e instanceof PrismaError) {
                    return reply
                        .status(e.responseStatusCode)
                        .send({
                            typeError: e.typeError,
                            message: e.message,
                        });
                }

                if (e instanceof Error) {
                    return reply.status(500).send({
                        typeError: e.name,
                        message: e.message,
                    });
                }
            }
        });
    };