import type { FastifyInstance } from "fastify";
import z from "zod";

const createNormaDataSchema = z.object({
  norma: z.object({
    codigo: z.string(),
    titulo: z.string(),
    escopo: z.string(),
    area_tecnica: z.string(),
    orgao_emissor: z.string(),
  }),
  versao: z.object({
    versao_numero: z.string(),
    descricao: z.string(),
    data_publicacao: z.coerce.date(),
    path_file: z.url(),
    status: z.boolean(),
  }),
  tags: z.array(
    z.object({
      id: z.string(),
    }),
  ),
});

export type CreateNormaData = z.infer<typeof createNormaDataSchema>;

export interface CreateNormaResponse {
  statusCode: number;
  id: string;
}

export interface ReadNormaProps {
  status: boolean | null;
  fastify: FastifyInstance;
}

export interface ReadNormaResponse {
  id: string;
  codigo: string;
  titulo: string;
  escopo: string;
  area_tecnica: string;
  orgao_emissor: string;
  versoes: {
    versao_numero: string;
    descricao: string;
    data_publicacao: Date;
    path_file: string;
    status: boolean;

    notas: {
      id: string;
      text: string;
      status: string;
      data_solicitacao: Date;
      data_aprovacao: Date | null;
      id_norma: string;
      versao_numero: string;
    }[];
  }[];

  tags: {
    tag: {
      id: string;
      nome: string;
    };
  }[];
}

export interface DeleteNormaProps {
  idNorma: string;
  fastify: FastifyInstance;
}

export interface DeleteNormaResponse {
  statusCode: number;
}

export interface NormaRepository {
  create(
    data: CreateNormaData,
    fastify: FastifyInstance,
  ): Promise<CreateNormaResponse>;

  read({ status, fastify }: ReadNormaProps): Promise<ReadNormaResponse[]>;

  delete({ idNorma, fastify }: DeleteNormaProps): Promise<DeleteNormaResponse>;
}
