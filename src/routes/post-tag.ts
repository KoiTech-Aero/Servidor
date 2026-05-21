import type { FastifyPluginAsyncZod }
from "fastify-type-provider-zod";

import {
  CreateTagSchema,
} from "../entidades/TagRepository.js";

import { PrismaTagRepository }
from "../repositories/prisma/PrismaTagRepository.js";

import { CreateTag }
from "../services/createTag.js";

export const postTag: FastifyPluginAsyncZod =
async (fastify) => {

  fastify.post(
    "/tags",
    {
      schema: {
        body: CreateTagSchema,
      },
    },
    async (request, reply) => {

      const data = request.body;

      try {

        const prismaTagRepository =
          new PrismaTagRepository();

        const createTag =
          new CreateTag(
            prismaTagRepository,
            fastify
          );

        const tag =
          await createTag.execute(data);

        return reply
          .code(201)
          .send(tag);

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