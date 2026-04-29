import type { FastifyInstance } from "fastify";
import z from "zod";

export interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
}

export const CreateUsuarioSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  role: z.enum(["Engenheiro", "Gestor"]),
  status: z.boolean(),
  senha: z.string(),
});

export type CreateUsuarioData = z.infer<typeof CreateUsuarioSchema>;

export interface CreateUsuarioResponse {
  id: string;
  nome: string;
  email: string;
  role: "Engenheiro" | "Gestor";
  status: boolean;
}

export const UpdateUsuarioSchema = z.object({
  nome: z.string(),
  email: z.string().email(),
  role: z.enum(["Engenheiro", "Gestor"]),
  status: z.boolean(),
});

export type UpdateUsuarioData =
  z.infer<typeof UpdateUsuarioSchema>;

export interface UpdateUsuarioResponse {
  id: string;
  nome: string;
  email: string;
  role: "Engenheiro" | "Gestor";
  status: boolean;
}

export const PatchUsuarioSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum(["Engenheiro", "Gestor"]).optional(),
  status: z.boolean().optional(),
});

export type PatchUsuarioData =
  z.infer<typeof PatchUsuarioSchema>;

export interface PatchUsuarioResponse {
  id: string;
  nome: string;
  email: string;
  role: "Engenheiro" | "Gestor";
  status: boolean;
}

export interface GetUsuarioResponse {
  id: string;
  nome: string;
  email: string;
  role: "Engenheiro" | "Gestor";
  status: boolean;
}

export interface UsuarioRepository {
  create(
  data: CreateUsuarioData,
  fastify: FastifyInstance
): Promise<CreateUsuarioResponse>;

  patch(
    id: string,
    data: PatchUsuarioData,
    fastify: FastifyInstance
  ): Promise<PatchUsuarioResponse>;

  read(
    fastify: FastifyInstance
  ): Promise<UsuarioResponse[]>;

  update(
    id: string,
    data: UpdateUsuarioData,
    fastify: FastifyInstance
  ): Promise<UpdateUsuarioResponse>;

    findByEmail(
    email: string,
    fastify: FastifyInstance
  ): Promise<UsuarioResponse | null>;

  findById(
  id: string,
  fastify: FastifyInstance
): Promise<GetUsuarioResponse | null>;

}