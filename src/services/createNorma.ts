import type { FastifyInstance } from "fastify";
import z from "zod";
import type { NormaRepository } from "../repositories/NormaRepository.js";

const createNormaRequestSchema = z.object({
	norma: z.object({
		codigo: z.string(),
		titulo: z.string(),
		escopo: z.string(),
		area_tecnica: z.string(),
		orgao_emissor: z.string(),
	}),
	versao: z.object({
		versao_numero: z.string(),
		descricao: z.string(),
		data_publicacao: z.coerce.date(),
		path_file: z.url(),
		status: z.boolean(),
	}),
});

export type CreateNormaRequest = z.infer<typeof createNormaRequestSchema>;

export class CreateNorma {
	constructor(
		private normaRepository: NormaRepository,
		private fastify: FastifyInstance,
	) {}

	async execute(data: CreateNormaRequest) {
		const norma = await this.normaRepository.create(data, this.fastify);

		return norma;
	}
}
