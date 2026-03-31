import type { FastifyInstance } from "fastify";
import z from "zod";

const createNormaDataSchema = z.object({
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

export type CreateNormaData = z.infer<typeof createNormaDataSchema>;

export interface CreateNormaResponse {
	statusCode: number;
	id: string;
}

export interface ReadNormaProps {
	conditions?: {
		status: string;
	};
	fastify: FastifyInstance;
}
export interface ReadNormaResponse {
	id: string;
	codigo: string;
	titulo: string;
	escopo: string;
	area_tecnica: string;
	orgao_emissor: string;
	versaos: {
		data_publicacao: Date;
		status: boolean;
	}[];
}

export interface NormaRepository {
	create(
		data: CreateNormaData,
		fastify: FastifyInstance,
	): Promise<CreateNormaResponse>;

	read({ conditions, fastify }: ReadNormaProps): Promise<ReadNormaResponse[]>;
}
