import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";

import z from "zod";

import {
  UpdateUsuarioSchema,
} from "../entidades/UsuarioRepository.js";

import { PrismaUsuarioRepository }
from "../repositories/prisma/PrismaUsuarioRepository.js";

import { UpdateUsuario }
from "../services/updateUsuario.js";

export const putUsuario: FastifyPluginAsyncZod =
async (fastify) => {

  fastify.put(
    "/usuarios/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: UpdateUsuarioSchema,
      },
    },
    async (request, reply) => {

      const { id } = request.params;

      const data = request.body;

      try {

        const repo =
          new PrismaUsuarioRepository();

        const service =
          new UpdateUsuario(repo, fastify);

        const usuario =
          await service.execute(id, data);

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