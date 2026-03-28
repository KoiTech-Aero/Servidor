import type { FastifyInstance } from "fastify/types/instance.js";
import type { NormaRepository } from "../entidades/NormaRepository.js";

export class ReadNorma {
  constructor(
    private normaRepository: NormaRepository,
    private fastify: FastifyInstance,
  ){}

  async execute() {
    try {
      const normas = await this.normaRepository.read(this.fastify)
      return normas
    } catch (e) {
      this.fastify.log.error(e)
    }
  }
}