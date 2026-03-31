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
import type { GetNormaResponse } from "../../types/getNormaResponse.js";

describe.concurrent("GET /normas - Recuperando normas", () => {
	let fastify: FastifyInstance;

	type Table = {
		tablename: string;
	};

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

	test("GET /normas - Recuperando norma", async () => {
		const dataNorma = {
			norma: {
				codigo: "NBR-123123",
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

		const getResponse = await fetch(
			`http://127.0.0.1:${env.SERVER_PORT}/normas`,
			{
				method: "GET",
			},
		);

		const getJson = (await getResponse.json()) as GetNormaResponse[];

		expect(response.status).toBe(201);
		expect(body).toHaveProperty("id");
		expect(getResponse.status).toBe(200);
		expect(getJson[0]?.id).toEqual(body.id);
	});
});
