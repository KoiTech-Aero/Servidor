import { randomUUID } from "crypto";
import type { FastifyInstance } from "fastify";
import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	test,
} from "vitest";
import { buildServer } from "../../app.js";
import { env } from "../../env.js";

describe.concurrent("POST /addNorma - Criando norma", () => {
	let fastify: FastifyInstance;

	type Table = {
		tablename: string;
	};

	interface ResponseError {
		typeError: string;
		message: string;
	}

	async function truncadeTables() {
		const tablesNames = await fastify.prisma.$queryRaw<
			Table[]
		>`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

		for (const { tablename } of tablesNames) {
			fastify.log.info(tablesNames);
			await fastify.prisma.$executeRawUnsafe(
				`TRUNCATE TABLE public."${tablename}" CASCADE;`,
			);
		}
	}

	beforeAll(async () => {
		if (process.env.NODE_ENV !== "test")
			throw new Error(`Banco de ${process.env.NODE_ENV} detectado`);

		if (env.DATABASE_URL.includes("neon.tech"))
			throw new Error("Banco Neon detectado");

		fastify = await buildServer();
		await fastify.ready();
	});

	beforeEach(async () => await truncadeTables());

	afterAll(async () => {
		await truncadeTables();
		await fastify.close();
	});

	test("POST /addNorma - Criando norma com sucesso usando Mock", async () => {
		const dataNorma = {
			norma: {
				codigo: randomUUID(),
				titulo: "Norma de Segurança do Trabalho",
				escopo: "Define requisitos para segurança em ambientes industriais",
				area_tecnica: "Segurança do Trabalho",
				orgao_emissor: "ABNT",
			},
			versao: {
				versao_numero: "1.0",
				descricao: "Versão inicial da norma",
				data_publicacao: "2024-01-15T00:00:00.000Z",
				path_file: "https://example.com/normas/nbr-1234.pdf",
				status: true,
			},
		};

		const response = await fetch(
			`http://127.0.0.1:${env.SERVER_PORT}/addNorma`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataNorma),
			},
		);

		const body = (await response.json()) as { id: string };

		expect(response.status).toBe(201);
		expect(body).toHaveProperty("id");
	});

	test("POST /addNorma - Tenta criar norma sem enviar body", async () => {
		const response = await fetch(
			`http://127.0.0.1:${env.SERVER_PORT}/addNorma`,
			{
				method: "POST",
			},
		);

		const body = (await response.json()) as ResponseError;

		expect(response.status).toBe(400);
		expect(body.typeError).toBe("FST_ERR_VALIDATION");
	});

	test("POST /addNorma - Tenta criar norma com código repetido", async () => {
		const dataNorma = {
			norma: {
				codigo: randomUUID(),
				titulo: "Norma de Segurança do Trabalho",
				escopo: "Define requisitos para segurança em ambientes industriais",
				area_tecnica: "Segurança do Trabalho",
				orgao_emissor: "ABNT",
			},
			versao: {
				versao_numero: "1.0",
				descricao: "Versão inicial da norma",
				data_publicacao: "2024-01-15T00:00:00.000Z",
				path_file: "https://example.com/normas/nbr-1234.pdf",
				status: true,
			},
		};

		const response1 = await fetch(
			`http://127.0.0.1:${env.SERVER_PORT}/addNorma`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataNorma),
			},
		);

		const response2 = await fetch(
			`http://127.0.0.1:${env.SERVER_PORT}/addNorma`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(dataNorma),
			},
		);

		const body1 = (await response1.json()) as { id: string };
		const body2 = (await response2.json()) as ResponseError;

		expect(response1.status).toBe(201);
		expect(body1).toHaveProperty("id");
		expect(response2.status).toBe(409);
		expect(body2.typeError).toBe("Insert Error");
	});
});
