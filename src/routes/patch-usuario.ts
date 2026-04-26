import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";
import z from "zod";
import {
  PatchUsuarioSchema,
} from "../entidades/UsuarioRepository.js";
import { PrismaUsuarioRepository }
from "../repositories/prisma/PrismaUsuarioRepository.js";
import { PatchUsuario }
from "../services/patchUsuario.js";
export const patchUsuario: FastifyPluginAsyncZod =
async (fastify) => {

  fastify.patch(
    "/usuarios/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: PatchUsuarioSchema,
      },
    },
    async (request, reply) => {

      const { id } = request.params;

      const data = request.body;

      try {

        const repo =
          new PrismaUsuarioRepository();

        const service =
          new PatchUsuario(repo, fastify);

        const usuario =
          await service.execute(
            id,
            data
          );

        return reply
          .code(200)
          .send(usuario);

      } catch (e) {

        if (e instanceof Error) {

          return reply
            .code(500)
            .send({
              typeError: e.name,
              message: e.message,
            });

        }

      }

    }
  );

};