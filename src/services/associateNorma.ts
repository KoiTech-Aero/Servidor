import type { FastifyInstance } from "fastify";
import type { NormaReferenciaRepository } from "../entidades/NormaReferenciaRepository.js";
import z from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/wasm-compiler-edge";
import { PrismaError } from "../entidades/prismaError.js";

const schema = z.object({
    id_norma_referencia: z.string(),
    id_norma_referenciada: z.string(),
    observacao: z.string().optional(),
});

export class AssociateNorma {
    constructor(
        private repo: NormaReferenciaRepository,
        private fastify: FastifyInstance
    ) { }

    async execute(data: any) {
        try {
            const parsed = schema.parse(data);

            if (
                parsed.id_norma_referencia === parsed.id_norma_referenciada
            ) {
                throw new PrismaError(
                    "Não pode associar a mesma norma",
                    400,
                    "BUSINESS_RULE",
                    "Validation Error"
                );
            }

            return await this.repo.create(parsed, this.fastify);
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    throw new PrismaError(
                        "Essa associação já existe",
                        409,
                        e.code,
                        "Insert Error"
                    );
                }
            }

            throw e;
        }
    }
}