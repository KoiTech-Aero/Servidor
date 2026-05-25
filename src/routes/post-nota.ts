import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";

import {
  CreateNotaSchema,
} from "../entidades/NotaRepository.js";

import { PrismaNotaRepository }
from "../repositories/prisma/PrismaNotaRepository.js";

import { CreateNota }
from "../services/createNota.js";

export const postNota:
FastifyPluginAsyncZod =
async (fastify) => {

  fastify.post(
    "/notas",
    {
      schema: {
        body: CreateNotaSchema,
      },
    },
    async (request, reply) => {

      const data = request.body;

      try {

        const prismaNotaRepository =
          new PrismaNotaRepository();

        const createNota =
          new CreateNota(
            prismaNotaRepository,
            fastify
          );

        const nota =
          await createNota.execute(data);

        return reply
          .code(201)
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