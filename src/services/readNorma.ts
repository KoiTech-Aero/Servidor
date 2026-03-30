import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
} from "@prisma/client/runtime/wasm-compiler-edge";
import type { FastifyInstance } from "fastify/types/instance.js";
import type { NormaRepository } from "../entidades/NormaRepository.js";
import { PrismaError } from "../entidades/prismaError.js";
import type { Conditions } from "../types/conditions.js";

export class ReadNorma {
	constructor(
		private normaRepository: NormaRepository,
		private fastify: FastifyInstance,
	) {}

	async execute(conditions: Conditions) {
		try {
			const boolStatus = conditions?.status;
			const normas = await this.normaRepository.read({
				conditions: { status: boolStatus },
				fastify: this.fastify,
			});
			return normas;
		} catch (e) {
			if (e instanceof PrismaClientInitializationError) {
				throw new PrismaError(
					e.message,
					500,
					e.errorCode || "1",
					"Server Error",
				);
			}

			if (e instanceof PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					throw new PrismaError(
						e.message,
						409,
						e.code,
						"Constraint Invalid",
						e.cause,
					);
				}
			}

			if (e instanceof Error) throw new Error(e.message, { cause: e.cause });
		}
	}
}
