import type { FastifyInstance } from "fastify";
import type { VersaoRepository } from "../entidades/VersaoRepository.js";
import z from "zod";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/wasm-compiler-edge";
import { PrismaError } from "../entidades/prismaError.js";


const CreateVersaoRequestSchema = z.object({
    id_norma: z.string(),
    versao_numero: z.string(),
    descricao: z.string(),
    data_publicacao: z.coerce.date(),
    path_file: z.url(),
    status: z.boolean(),
})

export type CreateVersaoRequest = z.infer<typeof CreateVersaoRequestSchema>

export class CreateVersao {
    constructor(
        private versaoRepository: VersaoRepository,
        private fastify: FastifyInstance
    ) { }

    async execute(versaoData: CreateVersaoRequest) {
        try {
            const createVersao = await this.versaoRepository.create(versaoData, this.fastify)

            return createVersao
        } catch (e) {
            if (e instanceof PrismaClientKnownRequestError) {
                if (e.code === "P2002") {
                    throw new PrismaError(
                        `Violação de constraint unica. Uma norma não pode ser criada com esse código (${versaoData.id_norma}, ${versaoData.versao_numero})`,
                        409,
                        e.code,
                        "Insert Error",
                        e.cause,
                    );
                }
            }
        }
    }
}