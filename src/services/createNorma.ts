import type { FastifyInstance } from "fastify";
import type { NormaRepository } from "../repositories/NormaRepository.js";

interface CreateNormaRequest {
	codigo: string;
	titulo: string;
	area_tecnica: string;
	orgao_emissor: string;
}

export class CreateNorma {
	constructor(
		private normaRepository: NormaRepository,
		private fastify: FastifyInstance,
	) {}

	async execute({
		codigo,
		titulo,
		area_tecnica,
		orgao_emissor,
	}: CreateNormaRequest) {
		const norma = await this.normaRepository.create(
			{
				codigo,
				titulo,
				area_tecnica,
				orgao_emissor,
			},
			this.fastify,
		);

		return norma;
	}
}
