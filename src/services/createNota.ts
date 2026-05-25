import type { FastifyInstance } from "fastify";

import type {
  NotaRepository,
  CreateNotaData,
} from "../entidades/NotaRepository.js";

export class CreateNota {

  constructor(
    private notaRepository: NotaRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(
    data: CreateNotaData
  ) {

    const nota =
      await this.notaRepository.create(
        data,
        this.fastify
      );

    return nota;

  }

}