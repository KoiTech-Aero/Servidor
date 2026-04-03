import type { FastifyInstance } from "fastify";
import z from "zod";

export const AssociateNormaDataSchema = z.object({
    id_norma_referencia: z.string(),
    id_norma_referenciada: z.string(),
    observacao: z.string().optional(),
});

export type AssociateNormaData = z.infer<typeof AssociateNormaDataSchema>;

export interface AssociateNormaResponse {
    id_norma_referencia: string;
    id_norma_referenciada: string;
    observacao?: string;
}

export interface NormaReferenciaRepository {
    create(
        data: AssociateNormaData,
        fastify: FastifyInstance
    ): Promise<AssociateNormaResponse>;
}