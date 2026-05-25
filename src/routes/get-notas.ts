import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";

import { PrismaNotaRepository }
from "../repositories/prisma/PrismaNotaRepository.js";

import { ReadNota }
from "../services/readNota.js";

export const getNotas: FastifyPluginAsyncZod =
async (fastify) => {

  fastify.get(
    "/notas",
    async (_, reply) => {

      try {

        const prismaNotaRepository =
          new PrismaNotaRepository();

        const readNota =
          new ReadNota(
            prismaNotaRepository,
            fastify
          );

        const notas =
          await readNota.execute();

        return reply
          .code(200)
          .send(notas);

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