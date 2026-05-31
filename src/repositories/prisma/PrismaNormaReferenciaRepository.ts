import type { FastifyInstance } from "fastify";
import type {
	AssociateNormaData,
	AssociateNormaResponse,
	DeleteNormaReferenciaData,
	NormaReferenciaRepository,
} from "../../entidades/NormaReferenciaRepository.js";

export class PrismaNormaReferenciaRepository
	implements NormaReferenciaRepository
{
	async create(
		{ id_norma_referencia, referencias }: AssociateNormaData,
		fastify: FastifyInstance,
	): Promise<AssociateNormaResponse> {
		const createRelations = await fastify.prisma.normaReferencia.createMany({
			data: [
				...referencias.map((r) => ({
					id_norma_referencia: id_norma_referencia,
					id_norma_referenciada: r.id_norma_referenciada,
					observacao: r.observacao || "",
				})),
			],
			skipDuplicates: true,
		});

		return { count: createRelations.count };
	}

	async delete(
		data: DeleteNormaReferenciaData,
		fastify: FastifyInstance,
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
