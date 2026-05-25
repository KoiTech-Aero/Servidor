import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";

import z from "zod";

import { PrismaNotaRepository }
from "../repositories/prisma/PrismaNotaRepository.js";

import { ReadNotaById }
from "../services/readNotaById.js";

export const getNotaById:
FastifyPluginAsyncZod =
async (fastify) => {

  fastify.get(
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

        const readNotaById =
          new ReadNotaById(
            prismaNotaRepository,
            fastify
          );

        const nota =
          await readNotaById.execute(id);

        if (!nota) {

          return reply
            .code(404)
            .send({
              message: "Nota não encontrada",
            });

        }

        return reply
          .code(200)
          .send(nota);

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