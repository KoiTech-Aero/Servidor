import type { FastifyRequest, FastifyReply } from "fastify";
import { createSolicitacaoDataSchema } from "../entidades/SolicitacaoRepository.js";
import { PrismaSolicitacaoRepository } from "../repositories/prisma/PrismaSolicitacaoRepository.js";

export async function createSolicitacao(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const data = createSolicitacaoDataSchema.parse(request.body);

    const repository = new PrismaSolicitacaoRepository();

    const result = await repository.create(data, request.server);

    return reply.status(result.statusCode).send({
      id: result.id,
    });
  } catch (error) {
    console.error(error);

    return reply.status(400).send({
      message: "Erro ao criar solicitação",
    });
  }
}