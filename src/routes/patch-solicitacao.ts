import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PatchSolicitacaoSchema } from "../entidades/SolicitacaoRepository.js";
import { PrismaSolicitacaoRepository } from "../repositories/prisma/PrismaSolicitacaoRepository.js";
import { PatchSolicitacao } from "../services/patchSolicitacao.js";

export const patchSolicitacao: FastifyPluginAsyncZod = async (fastify) => {
  fastify.patch(
    "/solicitacoes/norma/:id",
    {
      schema: {
        params: z.object({
          id: z.string(),
        }),
        body: PatchSolicitacaoSchema,
      },
    },
    async (request, reply) => {
      const { id } = request.params;

      const data = request.body;

      try {
        const repo = new PrismaSolicitacaoRepository();

        const service = new PatchSolicitacao(repo, fastify);

        const solicitacao = await service.execute(id, data);

        return reply.code(200).send(solicitacao);
      } catch (e) {
        if (e instanceof Error) {
          return reply.code(500).send({
            typeError: e.name,
            message: e.message,
          });
        }
      }
    },
  );
};
