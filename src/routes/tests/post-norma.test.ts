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
	let app: FastifyInstance;

	type Table = {
		tablename: string;
	};

	async function truncadeTables() {
		const tablesNames = await app.prisma.$queryRaw<
			Table[]
		>`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

		for (const { tablename } of tablesNames) {
			app.log.info(tablesNames);
			await app.prisma.$executeRawUnsafe(
				`TRUNCATE TABLE public."${tablename}" RESTART IDENTITY CASCADE;`,
			);
		}
	}

	beforeAll(async () => {
		if (process.env.NODE_ENV !== "test")
			throw new Error(`Banco de ${process.env.NODE_ENV} detectado`);

		if (env.DATABASE_URL.includes("neon.tech"))
			throw new Error("Banco Neon detectado");

		app = await buildServer();
		await app.ready();
	});

	beforeEach(async () => await truncadeTables());

	afterAll(async () => {
		await app.close();
		await truncadeTables();
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

		expect(response.status).toBe(201);
	});
});
