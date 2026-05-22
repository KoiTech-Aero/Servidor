import type { FastifyInstance } from "fastify";

import type {
  TagRepository,
  CreateTagData,
  CreateTagResponse,
  ReadTagResponse,
} from "../../entidades/TagRepository.js";

export class PrismaTagRepository
  implements TagRepository {

  async create(
    data: CreateTagData,
    fastify: FastifyInstance
  ): Promise<CreateTagResponse> {

    const tag =
      await fastify.prisma.tag.create({
        data: {
          nome: data.nome,
          descricao: data.descricao,
        },
      });

    return {
      id: tag.id,
      nome: tag.nome,
      descricao: tag.descricao,
    };

  }

  async read(
  fastify: FastifyInstance
): Promise<ReadTagResponse[]> {

  const tags =
    await fastify.prisma.tag.findMany({
      select: {
        id: true,
        nome: true,
        descricao: true,
      },
    });

  return tags;

}

async delete(
  id: string,
  fastify: FastifyInstance
): Promise<void> {

  await fastify.prisma.tag.delete({
    where: {
      id: id,
    },
  });

}

}