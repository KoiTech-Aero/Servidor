import { PrismaClientInitializationError } from "@prisma/client/runtime/wasm-compiler-edge";
import type { FastifyInstance } from "fastify";
import type { NormaRepository } from "../entidades/NormaRepository.js";
import { PrismaError } from "../entidades/prismaError.js";

export class DeleteNorma {
	constructor(
		private repo: NormaRepository,
		private fastify: FastifyInstance,
	) {}

	async execute(id: string) {
		try {
			const deleteResponse = await this.repo.delete({
				idNorma: id,
				fastify: this.fastify,
			});

			return deleteResponse;
		} catch (e) {
			if (e instanceof PrismaClientInitializationError) {
				throw new PrismaError(
					e.message,
					500,
					e.errorCode || "1",
					"Server Error",
				);
			}

			if (e instanceof Error) throw new Error(e.message, { cause: e.cause });
		}
	}
}
