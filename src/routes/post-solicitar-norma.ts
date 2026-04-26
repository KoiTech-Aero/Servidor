import type { FastifyInstance } from "fastify";
import { createSolicitacao } from "../services/createSolicitacao.js";
import { createSolicitacaoDataSchema } from "../entidades/SolicitacaoRepository.js";

export async function postSolicitacao(app: FastifyInstance) {
  app.post(
    "/solicitacoes/norma",
    {
      schema: {
        body: createSolicitacaoDataSchema,
      },
    },
    createSolicitacao,
  );
}