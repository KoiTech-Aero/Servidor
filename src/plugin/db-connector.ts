import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import type { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { env } from "../env.js";
import { PrismaClient } from "../generated/prisma/client.js";

declare module "fastify" {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

const prismaPlugin = async (fastify: FastifyInstance) => {
	const production = process.env.NODE_ENV === "production" ? true : false;

	let adapter: PrismaNeon | PrismaPg | null = null;

	if (production) {
		adapter = new PrismaNeon({
			connectionString: env.DATABASE_URL,
			max: 100,
			connectionTimeoutMillis: 2_000,
			idleTimeoutMillis: 2_000,
		});
	}

	if (!production) {
		adapter = new PrismaPg({
			connectionString: env.DATABASE_URL,
		});
	}

	if (!adapter) throw new Error("Adapter não criado");
	const prisma = new PrismaClient({ adapter });

	await prisma.$connect();

	fastify.decorate("prisma", prisma);

	fastify.addHook("onClose", async (server) => {
		await server.prisma.$disconnect();
	});
};

export default fp(prismaPlugin);
