import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";

import { PrismaTagRepository }
from "../repositories/prisma/PrismaTagRepository.js";

import { ReadTag }
from "../services/readTag.js";

export const getTags: FastifyPluginAsyncZod =
async (fastify) => {

  fastify.get(
    "/tags",
    async (_, reply) => {

      try {

        const prismaTagRepository =
          new PrismaTagRepository();

        const readTag =
          new ReadTag(
            prismaTagRepository,
            fastify
          );

        const tags =
          await readTag.execute();

        return reply
          .code(200)
          .send(tags);

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