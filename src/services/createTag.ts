import type { FastifyInstance } from "fastify";

import type {
  TagRepository,
  CreateTagData,
} from "../entidades/TagRepository.js";

export class CreateTag {

  constructor(
    private tagRepository: TagRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(
    data: CreateTagData
  ) {

    const tag =
      await this.tagRepository.create(
        data,
        this.fastify
      );

    return tag;
  }
}