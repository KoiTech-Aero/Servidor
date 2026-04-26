import { describe, it, expect, beforeAll } from "vitest";
import fastify, { type FastifyInstance } from "fastify";
import { postSolicitacao } from "../post-solicitar-norma.js";
import { getSolicitacao } from "../get-solicitacao.js";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();

let app: FastifyInstance;

beforeAll(async () => {
  app = fastify();

  app.decorate("prisma", prisma);

  await postSolicitacao(app);
  await getSolicitacao(app);

  await app.ready();
});

describe("Solicitacao", () => {
  it("deve criar uma solicitacao", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/solicitacoes/norma",
      payload: {
        titulo: "Teste",
        motivo: "Motivo teste",
        codigo_norma: "NBR 9999",
        versao_norma: "2020",
        orgao_emissor: "ABNT",
      },
    });

    expect(response.statusCode).toBe(201);

    const body = JSON.parse(response.body);

    expect(body).toHaveProperty("id");
  });

  it("deve listar solicitacoes", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/solicitacoes/norma",
    });

    expect(response.statusCode).toBe(200);

    const body = JSON.parse(response.body);

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });
});
