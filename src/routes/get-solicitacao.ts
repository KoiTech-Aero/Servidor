import type { FastifyInstance } from "fastify";
import { getSolicitacoes } from "../services/getSolicitacao.js";

export async function getSolicitacao(app: FastifyInstance) {
  app.get("/solicitacoes/norma", getSolicitacoes);
}