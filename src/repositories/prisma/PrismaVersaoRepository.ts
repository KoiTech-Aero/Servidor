import type { FastifyInstance } from "fastify";
import type {
  CreateVersaoData,
  CreateVersaoResponse,
  VersaoRepository,
} from "../../entidades/VersaoRepository.js";

export class PrismaVersaoRepository implements VersaoRepository {
  async create(
    versaoData: CreateVersaoData,
    fastify: FastifyInstance,
  ): Promise<CreateVersaoResponse> {
    const norma = await fastify.prisma.norma.findUnique({
      where: {
        codigo: versaoData.id_norma,
      },
      include: {
        versoes: {
          orderBy: {
            data_publicacao: "desc",
          },
        },
      },
    });

    if (!norma) {
      throw new Error("Norma não cadastrada");
    }

    const [, newVersao] = await fastify.prisma.$transaction([
      fastify.prisma.versao.updateMany({
        where: {
          id_norma: versaoData.id_norma,
        },
        data: {
          status: false,
        },
      }),

      fastify.prisma.versao.create({
        data: {
          ...versaoData,
          status: true,
        },
      }),
    ]);

    return { versao_numero: newVersao.versao_numero };
  }
}
