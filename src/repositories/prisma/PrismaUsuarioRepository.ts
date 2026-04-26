import type { FastifyInstance } from "fastify";

import type {
  UsuarioRepository,
  UsuarioResponse,
  UpdateUsuarioData,
  UpdateUsuarioResponse,
} from "../../entidades/UsuarioRepository.js";
export class PrismaUsuarioRepository
  implements UsuarioRepository {

  async read(
    fastify: FastifyInstance
  ): Promise<UsuarioResponse[]> {

    const usuarios =
      await fastify.prisma.usuario.findMany({
        select: {
          id: true,
          nome: true,
          email: true,
        },
      });

    return usuarios;
  }

  async update(
    id: string,
    data: UpdateUsuarioData,
    fastify: FastifyInstance
  ): Promise<UpdateUsuarioResponse> {

    const usuario =
      await fastify.prisma.usuario.update({
        where: {
          id: id,
        },
        data: {
          nome: data.nome,
          email: data.email,
          role: data.role,
          status: data.status,
        },
      });

    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
      status: usuario.status,
    };
  }

}