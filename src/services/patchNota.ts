import type { FastifyInstance } from "fastify";

import type {
  NotaRepository,
  PatchNotaData,
} from "../entidades/NotaRepository.js";

export class PatchNota {

  constructor(
    private notaRepository: NotaRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(
    id: string,
    data: PatchNotaData
  ) {

    const nota =
      await this.notaRepository.patch(
        id,
        data,
        this.fastify
      );

    return nota;

  }

}