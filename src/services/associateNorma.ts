import { PrismaClientKnownRequestError } from "@prisma/client/runtime/wasm-compiler-edge";
import type { FastifyInstance } from "fastify";
import z from "zod";
import type { NormaReferenciaRepository } from "../entidades/NormaReferenciaRepository.js";
import { PrismaError } from "../entidades/prismaError.js";

const associateNormaDataSchema = z.object({
	id_norma_referencia: z.string(),
	referencias: z.array(
		z.object({
			id_norma_referenciada: z.string(),
			observacao: z.string().optional(),
		}),
	),
});

type associateNormaDataType = z.infer<typeof associateNormaDataSchema>;

export class AssociateNorma {
	constructor(
		private repo: NormaReferenciaRepository,
		private fastify: FastifyInstance,
	) {}

	async execute(associateNormaData: associateNormaDataType) {
		try {
			const { data, success } =
				associateNormaDataSchema.safeParse(associateNormaData);

			if (!success) throw new Error("Formato de requisição incompativel");

			if (
				data.referencias.some(
					(r) => r.id_norma_referenciada === data.id_norma_referencia,
				)
			) {
				throw new PrismaError(
					"Não pode associar a mesma norma",
					400,
					"BUSINESS_RULE",
					"Validation Error",
				);
			}

			return await this.repo.create(data, this.fastify);
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					throw new PrismaError(
						"Essa associação já existe",
						409,
						e.code,
						"Insert Error",
					);
				}
			}

			throw e;
		}
	}
}
