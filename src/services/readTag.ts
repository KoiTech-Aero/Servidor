import type { FastifyInstance } from "fastify";

import type {
  TagRepository,
} from "../entidades/TagRepository.js";

export class ReadTag {

  constructor(
    private tagRepository: TagRepository,
    private fastify: FastifyInstance
  ) {}

  async execute() {

    const tags =
      await this.tagRepository.read(
        this.fastify
      );

    return tags;

  }

}