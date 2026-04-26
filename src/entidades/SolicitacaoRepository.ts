import type { FastifyInstance } from "fastify";
import { z } from "zod";

export const createSolicitacaoDataSchema = z.object({
  titulo: z.string(),
  motivo: z.string(),

  codigo_norma: z.string().optional(),
  versao_norma: z.string().optional(),
  orgao_emissor: z.string().optional(),

  data_solicitacao: z.string().optional(),

  status: z.enum(["Aprovado", "Pendente", "Recusado"]).optional(),

  id_usuario: z.string().optional(),
});

export type CreateSolicitacaoData = z.infer<typeof createSolicitacaoDataSchema>;

export interface CreateSolicitacaoResponse {
  statusCode: number;
  id: string;
}

export interface ReadSolicitacaoProps {
  conditions?: {
    status?: "Aprovado" | "Pendente" | "Recusado";
  };
  fastify: FastifyInstance;
}

export interface ReadSolicitacaoResponse {
  id: string;
  titulo: string;
  motivo: string;
  data_solicitacao: Date;
  status: "Aprovado" | "Pendente" | "Recusado";

  codigo_norma: string | null;
  versao_norma: string | null;
  orgao_emissor: string | null;

  usuario: {
    id: string;
  } | null;
}

export interface SolicitacaoRepository {
  create(
    data: CreateSolicitacaoData,
    fastify: FastifyInstance,
  ): Promise<CreateSolicitacaoResponse>;

  read(props: ReadSolicitacaoProps): Promise<ReadSolicitacaoResponse[]>;
}
