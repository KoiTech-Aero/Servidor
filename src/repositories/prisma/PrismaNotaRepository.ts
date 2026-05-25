import type { FastifyInstance } from "fastify";

import type {
  NotaRepository,
  ReadNotaResponse,
} from "../../entidades/NotaRepository.js";

export class PrismaNotaRepository
  implements NotaRepository {

  async read(
    fastify: FastifyInstance
  ): Promise<ReadNotaResponse[]> {

    const notas =
      await fastify.prisma.nota.findMany({
        select: {
          id: true,
          text: true,
          status: true,
          data_solicitacao: true,
          data_aprovacao: true,
          id_norma: true,
          versao_numero: true,
        },
      });

    return notas;

  }

}