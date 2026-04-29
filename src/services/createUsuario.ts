import { PrismaError } from "../entidades/prismaError.js";
import { PrismaClientInitializationError } from "@prisma/client/runtime/wasm-compiler-edge";
import type { FastifyInstance } from "fastify";
import type { UsuarioRepository, CreateUsuarioData } from "../entidades/UsuarioRepository.js";
export class CreateUsuario {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(data: CreateUsuarioData) {
    try {
      // ✅ Validação: usuário já existe?
      const usuarioExistente = await this.usuarioRepository.findByEmail(
        data.email,
        this.fastify
      );

      if (usuarioExistente) {
        throw new PrismaError(
          "Usuário com esse e-mail já está cadastrado.",
          409,
          "CONFLICT",
          "Conflict"
        );
      }

      // Prossegue com a criação...
      return await this.usuarioRepository.create(data, this.fastify);

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