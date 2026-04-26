import type { FastifyInstance } from "fastify";

import type {
  UsuarioRepository,
  PatchUsuarioData,
} from "../entidades/UsuarioRepository.js";

export class PatchUsuario {

  constructor(
    private usuarioRepository: UsuarioRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(
    id: string,
    data: PatchUsuarioData
  ) {

    const usuario =
      await this.usuarioRepository.patch(
        id,
        data,
        this.fastify
      );

    return usuario;

  }

}