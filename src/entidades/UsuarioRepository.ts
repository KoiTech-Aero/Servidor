import type { FastifyInstance } from "fastify";
import z from "zod";

export interface UsuarioResponse {
  id: string;
  nome: string;
  email: string;
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

export interface UsuarioRepository {

  read(
    fastify: FastifyInstance
  ): Promise<UsuarioResponse[]>;

  update(
    id: string,
    data: UpdateUsuarioData,
    fastify: FastifyInstance
  ): Promise<UpdateUsuarioResponse>;

}