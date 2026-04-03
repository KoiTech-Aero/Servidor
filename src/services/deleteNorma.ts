import type { FastifyInstance } from "fastify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/wasm-compiler-edge";
import { PrismaError } from "../entidades/prismaError.js";
import type { NormaReferenciaRepository } from "../entidades/NormaReferenciaRepository.js";

export class DeleteNorma {
    constructor(
        private repo: NormaReferenciaRepository,
        private fastify: FastifyInstance
    ) { }

    async execute(data: {
        id_norma_referencia: string;
        id_norma_referenciada: string;
    }) {
        try {
            await this.repo.delete(data, this.fastify);

            return { message: "Associação removida com sucesso" };
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === "P2025") {
                    throw new PrismaError(
                        "Associação não encontrada",
                        404,
                        e.code,
                        "Not Found"
                    );
                }
            }
            throw e;
        }
    }
}