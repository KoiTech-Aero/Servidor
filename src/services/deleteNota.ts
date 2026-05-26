import type { FastifyInstance } from "fastify";

import type {
  NotaRepository,
} from "../entidades/NotaRepository.js";

export class DeleteNota {

  constructor(
    private notaRepository: NotaRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(id: string) {

    await this.notaRepository.delete(
      id,
      this.fastify
    );

  }

}