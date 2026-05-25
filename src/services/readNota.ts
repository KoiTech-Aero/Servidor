import type { FastifyInstance } from "fastify";

import type {
  NotaRepository,
} from "../entidades/NotaRepository.js";

export class ReadNota {

  constructor(
    private notaRepository: NotaRepository,
    private fastify: FastifyInstance
  ) {}

  async execute() {

    const notas =
      await this.notaRepository.read(
        this.fastify
      );

    return notas;

  }

}