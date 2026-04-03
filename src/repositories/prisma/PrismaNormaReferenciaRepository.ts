import type { FastifyInstance } from "fastify";
import type {
    AssociateNormaData,
    AssociateNormaResponse,
    NormaReferenciaRepository,
    DeleteNormaReferenciaData
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

    async delete(
        data: DeleteNormaReferenciaData,
        fastify: FastifyInstance
    ): Promise<void> {
        await fastify.prisma.normaReferencia.delete({
            where: {
                NormaReferenciaId: {
                    id_norma_referencia: data.id_norma_referencia,
                    id_norma_referenciada: data.id_norma_referenciada,
                },
            },
        });
    }

    async findByNorma(id: string, fastify: FastifyInstance) {
        const referencias = await fastify.prisma.normaReferencia.findMany({
            where: {
                id_norma_referencia: id,
            },
            include: {
                norma_referenciada: true,
            },
        });

        return referencias.map((ref) => ({
            id: ref.norma_referenciada.id,
            titulo: ref.norma_referenciada.titulo,
            codigo: ref.norma_referenciada.codigo,
            observacao: ref.observacao,
        }));
    }
}