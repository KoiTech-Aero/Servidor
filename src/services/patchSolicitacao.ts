import type { FastifyInstance } from "fastify";

import type {
  SolicitacaoRepository,
  PatchSolicitacaoData,
} from "../entidades/SolicitacaoRepository.js";

export class PatchSolicitacao {
  constructor(
    private solicitacaoRepository: SolicitacaoRepository,
    private fastify: FastifyInstance,
  ) {}

  async execute(id: string, data: PatchSolicitacaoData) {
    const solicitacao = await this.solicitacaoRepository.patch(id, data, this.fastify);

    return solicitacao;
  }
}
