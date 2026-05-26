import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";

import z from "zod";

import {
  PatchNotaSchema,
} from "../entidades/NotaRepository.js";

import { PrismaNotaRepository }
from "../repositories/prisma/PrismaNotaRepository.js";

import { PatchNota }
from "../services/patchNota.js";

export const patchNota:
FastifyPluginAsyncZod =
async (fastify) => {

  fastify.patch(
    "/notas/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: PatchNotaSchema,
      },
    },
    async (request, reply) => {

      const { id } = request.params;
      const data = request.body;

      try {

        const prismaNotaRepository =
          new PrismaNotaRepository();

        const patchNota =
          new PatchNota(
            prismaNotaRepository,
            fastify
          );

        const nota =
          await patchNota.execute(
            id,
            data
          );

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