import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from "@prisma/client/runtime/wasm-compiler-edge";
import type { FastifyInstance } from "fastify";
import z from "zod";
import { PrismaError } from "../entidades/prismaError.js";
import type { VersaoRepository } from "../entidades/VersaoRepository.js";

const CreateVersaoRequestSchema = z.object({
	id_norma: z.string(),
	versao_numero: z.string(),
	descricao: z.string(),
	data_publicacao: z.coerce.date(),
	path_file: z.url(),
	status: z.boolean(),
});

export type CreateVersaoRequest = z.infer<typeof CreateVersaoRequestSchema>;

export class CreateVersao {
	constructor(
		private versaoRepository: VersaoRepository,
		private fastify: FastifyInstance,
	) {}

	async execute(versaoData: CreateVersaoRequest) {
		try {
			this.fastify.log.info(versaoData);

			const createVersao = await this.versaoRepository.create(
				versaoData,
				this.fastify,
			);

			return createVersao;
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					throw new PrismaError(
						`Violação de constraint unica. Uma versao não pode ser criada com esse código (${versaoData.versao_numero})`,
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
