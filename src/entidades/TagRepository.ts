import type { FastifyInstance } from "fastify";
import z from "zod";

export const CreateTagSchema = z.object({
  nome: z.string(),
  descricao: z.string(),
});

export type CreateTagData =
  z.infer<typeof CreateTagSchema>;

export interface CreateTagResponse {
  id: string;
  nome: string;
  descricao: string;
}

export interface ReadTagResponse {
  id: string;
  nome: string;
  descricao: string;
}

export interface TagRepository {

  create(
    data: CreateTagData,
    fastify: FastifyInstance
  ): Promise<CreateTagResponse>;

  read(
  fastify: FastifyInstance
): Promise<ReadTagResponse[]>;

delete(
  id: string,
  fastify: FastifyInstance
): Promise<void>;

}