import type { FastifyInstance } from "fastify";

export interface ReadNotaResponse {
  id: string;
  text: string;
  status: string;
  data_solicitacao: Date;
  data_aprovacao: Date | null;
  id_norma: string;
  versao_numero: string;
}

export interface NotaRepository {

  read(
    fastify: FastifyInstance
  ): Promise<ReadNotaResponse[]>;

}