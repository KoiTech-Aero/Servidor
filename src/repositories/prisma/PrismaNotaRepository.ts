import type { FastifyInstance } from "fastify";

import type {
  NotaRepository,
  ReadNotaResponse,
  CreateNotaData,
  CreateNotaResponse,
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

  async readById(
    id: string,
    fastify: FastifyInstance
  ): Promise<ReadNotaResponse | null> {
  
    const nota =
      await fastify.prisma.nota.findUnique({
        where: {
          id: id,
        },
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
  
    return nota;
  }

  async create(
    data: CreateNotaData,
    fastify: FastifyInstance
  ): Promise<CreateNotaResponse> {
  
    const nota =
      await fastify.prisma.nota.create({
        data: {
          text: data.text,
          id_norma: data.id_norma,
          versao_numero: data.versao_numero,
        },
      });
  
    return {
      id: nota.id,
      text: nota.text,
      status: nota.status,
    };
  }

}