import type { FastifyInstance } from "fastify";
import z from "zod";

export interface ReadNotaResponse {
  id: string;
  text: string;
  status: string;
  data_solicitacao: Date;
  data_aprovacao: Date | null;
  id_norma: string;
  versao_numero: string;
}

export const CreateNotaSchema = z.object({
    text: z.string(),
    id_norma: z.string(),
    versao_numero: z.string(),
  });
  
  export type CreateNotaData =
    z.infer<typeof CreateNotaSchema>;
  
  export interface CreateNotaResponse {
    id: string;
    text: string;
    status: string;
  }

export const PatchNotaSchema = z.object({
  text: z.string().optional(),
  status: z.string().optional(),
  data_aprovacao: z.coerce.date().optional(),
});

export type PatchNotaData =
  z.infer<typeof PatchNotaSchema>;

export interface PatchNotaResponse {
  id: string;
  text: string;
  status: string;
}

export interface NotaRepository {

  read(
    fastify: FastifyInstance
  ): Promise<ReadNotaResponse[]>;

  readById(
    id: string,
    fastify: FastifyInstance
  ): Promise<ReadNotaResponse | null>;
  
  create(
    data: CreateNotaData,
    fastify: FastifyInstance
  ): Promise<CreateNotaResponse>;

  patch(
    id: string,
    data: PatchNotaData,
    fastify: FastifyInstance
  ): Promise<PatchNotaResponse>;

}