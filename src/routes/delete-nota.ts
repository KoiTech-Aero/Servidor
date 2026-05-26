import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";

import z from "zod";

import { PrismaNotaRepository }
from "../repositories/prisma/PrismaNotaRepository.js";

import { DeleteNota }
from "../services/deleteNota.js";

export const deleteNota:
FastifyPluginAsyncZod =
async (fastify) => {

  fastify.delete(
    "/notas/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
      },
    },
    async (request, reply) => {

      const { id } = request.params;

      try {

        const prismaNotaRepository =
          new PrismaNotaRepository();

        const deleteNota =
          new DeleteNota(
            prismaNotaRepository,
            fastify
          );

        await deleteNota.execute(id);

        return reply
          .code(204)
          .send();

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