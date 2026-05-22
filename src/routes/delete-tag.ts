import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";

import z from "zod";

import { PrismaTagRepository }
from "../repositories/prisma/PrismaTagRepository.js";

import { DeleteTag }
from "../services/deleteTag.js";

export const deleteTag: FastifyPluginAsyncZod =
async (fastify) => {

  fastify.delete(
    "/tags/:id",
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

        const prismaTagRepository =
          new PrismaTagRepository();

        const deleteTag =
          new DeleteTag(
            prismaTagRepository,
            fastify
          );

        await deleteTag.execute(id);

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