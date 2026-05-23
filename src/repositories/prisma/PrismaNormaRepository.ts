import type { FastifyInstance } from "fastify";
import type {
	CreateNormaData,
	NormaRepository,
	ReadNormaProps,
	ReadNormaResponse,
} from "../../entidades/NormaRepository.js";

export class PrismaNormaRepository implements NormaRepository {
	async create(
		{ norma, versao, tags }: CreateNormaData,
		fastify: FastifyInstance,
	) {
		const responseNorma = await fastify.prisma.norma.create({
			data: {
				codigo: norma.codigo,
				titulo: norma.titulo,
				escopo: norma.escopo,
				area_tecnica: norma.area_tecnica,
				orgao_emissor: norma.orgao_emissor,
				versoes: {
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

		const responseTag = await fastify.prisma.normasTags.createMany({
			data: [
				...tags.map((tag) => ({ id_norma: responseNorma.id, id_tag: tag.id })),
			],
			skipDuplicates: true,
		});

		if (!responseNorma.id && !responseTag.count)
			throw new Error("Erro ao Criar Norma");

		return { statusCode: 201, id: responseNorma.id };
	}

	async read({
		conditions,
		fastify,
	}: ReadNormaProps): Promise<ReadNormaResponse[]> {
		let boolStatus: boolean | null = null;
		if (conditions?.status) {
			boolStatus = conditions?.status === "true";
		}

		const response = await fastify.prisma.norma.findMany({
			...(boolStatus !== null && {
				where: {
					versoes: {
						some: {
							status: boolStatus,
						},
					},
				},
			}),
			include: {
				versoes: {
					select: {
						versao_numero: true,
						descricao: true,
						data_publicacao: true,
						path_file: true,
						status: true,
					},
				},
				tags: {
					select: {
						tag: {
							select: {
								id: true,
								nome: true,
							},
						},
					},
				},
			},
		});

		return response;
	}
}
