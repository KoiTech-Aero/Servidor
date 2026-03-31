import type { FastifyInstance } from "fastify";
import type {
	CreateNormaData,
	NormaRepository,
	ReadNormaProps,
} from "../../entidades/NormaRepository.js";

export class PrismaNormaRepository implements NormaRepository {
	async create({ norma, versao }: CreateNormaData, fastify: FastifyInstance) {
		const response = await fastify.prisma.norma.create({
			data: {
				codigo: norma.codigo,
				titulo: norma.titulo,
				escopo: norma.escopo,
				area_tecnica: norma.area_tecnica,
				orgao_emissor: norma.orgao_emissor,
				versaos: {
					create: {
						versao_numero: versao.versao_numero,
						descricao: versao.descricao,
						data_publicacao: versao.data_publicacao,
						path_file: versao.path_file,
						status: versao.status,
					},
				},
			},
		});

		return { statusCode: 201, id: response.id };
	}

	async read({ conditions, fastify }: ReadNormaProps) {
		let boolStatus: boolean | null = null;
		if(conditions?.status) {
			boolStatus = conditions?.status === "true";
		}

		const response = await fastify.prisma.norma.findMany({
			...(boolStatus !== null && {
				where: {
					versaos: {
						some: {
							status: boolStatus
						}
					},
				},
			}),
			include: {
				versaos: {
					select: {
						data_publicacao: true,
						status: true,
					},
				},
			},
		});

		return response;
	}
}
