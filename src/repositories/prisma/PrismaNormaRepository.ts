import type { FastifyInstance } from "fastify";
import type { CreateNormaData, NormaRepository } from "../NormaRepository.js";

export class PrismaNormaRepository implements NormaRepository {
	async create(data: CreateNormaData, fastify: FastifyInstance) {
		const response = await fastify.prisma.norma.create({
			data,
		});

		return { statusCode: 201, id: response.id };
	}

	fudeu() {
		console.log();
	}
}
