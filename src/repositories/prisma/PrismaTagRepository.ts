import type { FastifyInstance } from "fastify";

import type {
  TagRepository,
  CreateTagData,
  CreateTagResponse,
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

}