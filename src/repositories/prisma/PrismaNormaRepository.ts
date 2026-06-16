import { unlink } from "node:fs/promises";
import path from "node:path";
import type { FastifyInstance } from "fastify";
import type {
  CreateNormaData,
  DeleteNormaProps,
  DeleteNormaResponse,
  NormaRepository,
  ReadNormaProps,
  ReadNormaResponse,
} from "../../entidades/NormaRepository.js";

export class PrismaNormaRepository implements NormaRepository {
  async create(
    { norma, versao, tags }: CreateNormaData,
    fastify: FastifyInstance,
  ) {
    const responseNorma = await fastify.prisma.norma.create({
      data: {
        codigo: norma.codigo,
        titulo: norma.titulo,
        escopo: norma.escopo,
        area_tecnica: norma.area_tecnica,
        orgao_emissor: norma.orgao_emissor,
        versoes: {
          create: {
            versao_numero: versao.versao_numero,
            descricao: versao.descricao,
            data_publicacao: versao.data_publicacao,
            path_file: versao.path_file,
            status: versao.status,
          },
        },
      },
    });

    const responseTag = await fastify.prisma.normasTags.createMany({
      data: [
        ...tags.map((tag) => ({ id_norma: responseNorma.id, id_tag: tag.id })),
      ],
      skipDuplicates: true,
    });

    if (!responseNorma.id && !responseTag.count)
      throw new Error("Erro ao Criar Norma");

    return { statusCode: 201, id: responseNorma.id };
  }

  async read({
    status,
    fastify,
  }: ReadNormaProps): Promise<ReadNormaResponse[]> {
    const response = await fastify.prisma.norma.findMany({
      ...(status !== null && {
        where: {
          versoes: {
            some: {
              status: status,
            },
          },
        },
      }),
      include: {
        versoes: {
          select: {
            versao_numero: true,
            descricao: true,
            data_publicacao: true,
            path_file: true,
            status: true,

            notas: {
              select: {
                id: true,
                text: true,
                status: true,
                data_solicitacao: true,
                data_aprovacao: true,
                id_norma: true,
                versao_numero: true,
              },
            },
          },
        },
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                nome: true,
              },
            },
          },
        },
      },
    });

    return response;
  }

  async delete({
    idNorma,
    fastify,
  }: DeleteNormaProps): Promise<DeleteNormaResponse> {
    const deletedNorma = await fastify.prisma.$transaction(async (tx) => {
      return tx.norma.delete({
        where: {
          id: idNorma,
        },
        include: {
          versoes: true,
        },
      });
    });

    const uploadDir = path.join(process.cwd(), "uploads");

    deletedNorma.versoes.map(async (v) => {
      const paths = v.path_file.split("/");
      const fileName = paths[paths.length - 1];
      if (fileName) {
        await unlink(path.join(uploadDir, fileName));
      }
    });

    return { statusCode: 200 };
  }
}
