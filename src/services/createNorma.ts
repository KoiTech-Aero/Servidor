import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from "@prisma/client/runtime/client";
import type { FastifyInstance } from "fastify";
import z from "zod";
import type { NormaRepository } from "../entidades/NormaRepository.js";
import { PrismaError } from "../entidades/prismaError.js";

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
		try {
			const norma = await this.normaRepository.create(data, this.fastify);

			return norma;
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					throw new PrismaError(
						`Violação de constraint unica. Uma norma não pode ser criada com esse código (${data.norma.codigo})`,
						409,
						e.code,
						"Insert Error",
						e.cause,
					);
				}
			}
			if (e instanceof PrismaClientValidationError) {
				throw new PrismaError(
					e.message,
					409,
					"Undefined",
					"Params Error",
					e.cause,
				);
			}

			if (e instanceof Error) {
				throw new Error(e.message);
			}
		}
	}
}
