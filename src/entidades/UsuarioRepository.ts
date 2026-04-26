import type { FastifyInstance } from "fastify";

export interface UsuarioResponse {
    id: string;
    nome: string;
    email: string;
}

export interface UsuarioRepository {
    read(
        fastify: FastifyInstance
    ): Promise<UsuarioResponse[]>;
}