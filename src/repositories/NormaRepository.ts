import type { FastifyInstance } from "fastify";

export interface CreateNormaData {
	codigo: string;
	titulo: string;
	area_tecnica: string;
	orgao_emissor: string;
}

export interface CreateNormaResponse {
	statusCode: number;
	id: string;
}

export interface NormaRepository {
	create(
		data: CreateNormaData,
		fastify: FastifyInstance,
	): Promise<CreateNormaResponse>;
}
