import type { FastifyInstance } from "fastify";

import type {
  NotaRepository,
} from "../entidades/NotaRepository.js";

export class ReadNotaById {

  constructor(
    private notaRepository: NotaRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(id: string) {

    const nota =
      await this.notaRepository.readById(
        id,
        this.fastify
      );

    return nota;

  }

}