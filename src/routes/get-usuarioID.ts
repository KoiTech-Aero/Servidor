import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { PrismaUsuarioRepository } from "../repositories/prisma/PrismaUsuarioRepository.js";
import { GetUsuario } from "../services/getUsuario.js";
import { PrismaError } from "../entidades/prismaError.js";

export const getUsuario: FastifyPluginAsyncZod =
  async (fastify) => {
    fastify.get("/usuarios/:id", async (request, reply) => {
      try {
        const { id } = request.params as { id: string };

        const repo = new PrismaUsuarioRepository();

        const service = new GetUsuario(repo, fastify);

        const usuario = await service.execute(id);

        return reply.status(200).send(usuario);

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