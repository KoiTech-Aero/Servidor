import type { FastifyInstance } from "fastify";
import type {
  CreateSolicitacaoData,
  SolicitacaoRepository,
  ReadSolicitacaoProps,
  ReadSolicitacaoResponse,
} from "../../entidades/SolicitacaoRepository.js";

export class PrismaSolicitacaoRepository implements SolicitacaoRepository {
  async create(data: CreateSolicitacaoData, fastify: FastifyInstance) {
    const dataToCreate: any = {
      titulo: data.titulo,
      motivo: data.motivo,
      status: data.status ?? "Pendente",

      data_solicitacao: new Date(),

      codigo_norma: data.codigo_norma ?? null,
      versao_norma: data.versao_norma ?? null,
      orgao_emissor: data.orgao_emissor ?? null,
    };

    if (data.id_usuario) {
      dataToCreate.usuario = {
        connect: {
          id: data.id_usuario,
        },
      };
    }

    const response = await fastify.prisma.solicitacaoNorma.create({
      data: dataToCreate,
    });

    return {
      statusCode: 201,
      id: response.id,
    };
  }

  async read({
    conditions,
    fastify,
  }: ReadSolicitacaoProps): Promise<ReadSolicitacaoResponse[]> {
    const response = await fastify.prisma.solicitacaoNorma.findMany({
      ...(conditions?.status && {
        where: {
          status: conditions.status,
        },
      }),

      include: {
        usuario: true,
      },
    });

    return response.map((item) => ({
      id: item.id,
      titulo: item.titulo,
      motivo: item.motivo,
      data_solicitacao: item.data_solicitacao,
      status: item.status,

      codigo_norma: item.codigo_norma,
      versao_norma: item.versao_norma,
      orgao_emissor: item.orgao_emissor,

      usuario: item.usuario
        ? {
            id: item.usuario.id,
          }
        : null,
    }));
  }
}
