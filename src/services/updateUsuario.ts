import type { FastifyInstance } from "fastify";

import type {
  UsuarioRepository,
  UpdateUsuarioData,
} from "../entidades/UsuarioRepository.js";

export class UpdateUsuario {

  constructor(
    private usuarioRepository: UsuarioRepository,
    private fastify: FastifyInstance
  ) {}

  async execute(
    id: string,
    data: UpdateUsuarioData
  ) {

    const usuario =
      await this.usuarioRepository.update(
        id,
        data,
        this.fastify
      );

    return usuario;

  }

}