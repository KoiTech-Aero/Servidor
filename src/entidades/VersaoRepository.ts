import type { FastifyInstance } from "fastify";
import z from "zod";

const CreateVersaoDataSchema = z.object({
    id_norma: z.string(),
    versao_numero: z.string(),
    descricao: z.string(),
    data_publicacao: z.coerce.date(),
    path_file: z.url(),
    status: z.boolean(),
})

export type CreateVersaoData = z.infer<typeof CreateVersaoDataSchema>

export interface CreateVersaoResponse {
    versao_numero: string
}

export interface VersaoRepository {
    create(
        versaoData: CreateVersaoData,
        fastify: FastifyInstance
    ): Promise<CreateVersaoResponse>
}