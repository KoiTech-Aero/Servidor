import type { FastifyRequest, FastifyReply } from "fastify";
import { PrismaSolicitacaoRepository } from "../repositories/prisma/PrismaSolicitacaoRepository.js";

export async function getSolicitacoes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { status } = request.query as {
      status?: "Aprovado" | "Pendente" | "Recusado";
    };

    const repository = new PrismaSolicitacaoRepository();

    const conditions: any = {};

    if (status) {
      conditions.status = status;
    }

    const result = await repository.read({
      conditions,
      fastify: request.server,
    });

    return reply.status(200).send(result);
  } catch (error) {
    console.error(error);
    return reply.status(500).send({
      message: "Erro ao buscar solicitações",
    });
  }
}