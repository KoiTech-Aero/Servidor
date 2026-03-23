import { randomUUID } from "crypto";
import type { FastifyInstance } from "fastify";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { buildServer } from "../../app.js";
import { env } from "../../env.js";

describe.concurrent("POST /addNorma - Criando norma", () => {
	let app: FastifyInstance;

	beforeAll(async () => {
		if (process.env.NODE_ENV !== "test")
			throw new Error(`Banco de ${process.env.NODE_ENV} detectado`);

		if (env.DATABASE_URL.includes("neon.tech"))
			throw new Error("Banco Neon detectado");

		app = await buildServer();
		await app.ready();
		await app.prisma.$executeRawUnsafe(
			"DROP SCHEMA public CASCADE; CREATE SCHEMA public;",
		);
	});

	afterAll(async () => {
		await app.close();
	});

	test("POST /addNorma - Criando norma com sucesso usando Mock", async () => {
		const dateNorma = {
			codigo: randomUUID(),
			titulo: "Norma Teste",
			area_tecnica: "Área Teste",
			orgao_emissor: "Tester",
		};

		const response = await fetch("http://127.0.0.1:3000/addNorma", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dateNorma),
		});

		expect(response.status).toBe(201);
	});
});
