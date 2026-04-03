import type { FastifyInstance } from "fastify";
import type {
    AssociateNormaData,
    AssociateNormaResponse,
    NormaReferenciaRepository,
} from "../../entidades/NormaReferenciaRepository.js";

export class PrismaNormaReferenciaRepository
    implements NormaReferenciaRepository {
    async create(
        data: AssociateNormaData,
        fastify: FastifyInstance
    ): Promise<AssociateNormaResponse> {
        const response = await fastify.prisma.normaReferencia.create({
            data: {
                ...data,
                observacao: data.observacao ?? "",
            },
        });

        return {
            id_norma_referencia: response.id_norma_referencia,
            id_norma_referenciada: response.id_norma_referenciada,
            observacao: response.observacao,
        };
    }
}