import type { FastifyInstance } from "fastify";
import type { UsuarioRepository } from "../entidades/UsuarioRepository.js";
import { PrismaClientInitializationError } from "@prisma/client/runtime/wasm-compiler-edge";
import { PrismaError } from "../entidades/prismaError.js";

export class GetUsuario {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(id: string) {
    try {
      const usuario = await this.usuarioRepository.findById(id, this.fastify);

      if (!usuario) {
        throw new PrismaError(
          "Usuário não encontrado.",
          404,
          "NOT_FOUND",
          "Not Found"
        );
      }

      return usuario;
    } catch (e) {
      if (e instanceof PrismaClientInitializationError) {
        throw new PrismaError(e.message, 500, e.errorCode || "1", "Server Error");
      }
      if (e instanceof Error) {
        throw new Error(e.message);
      }
    }
  }
}