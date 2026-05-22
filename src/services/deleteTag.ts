import type { FastifyInstance } from "fastify";

import type {
  TagRepository,
} from "../entidades/TagRepository.js";

export class DeleteTag {

  constructor(
    private tagRepository: TagRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(id: string) {

    await this.tagRepository.delete(
      id,
      this.fastify
    );

  }

}