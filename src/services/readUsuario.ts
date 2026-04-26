import type { FastifyInstance } from "fastify";
import type { UsuarioRepository } from "../entidades/UsuarioRepository.js";
import {
    PrismaClientInitializationError,
} from "@prisma/client/runtime/wasm-compiler-edge";
import { PrismaError } from "../entidades/prismaError.js";

export class ReadUsuario {
    constructor(
        private usuarioRepository: UsuarioRepository,
        private fastify: FastifyInstance
    ) { }

    async execute() {
        try {
            const usuarios =
                await this.usuarioRepository.read(this.fastify);

            return usuarios;
        } catch (e) {
            if (e instanceof PrismaClientInitializationError) {
                throw new PrismaError(
                    e.message,
                    500,
                    e.errorCode || "1",
                    "Server Error"
                );
            }

            if (e instanceof Error)
                throw new Error(e.message);
        }
    }
}