import type { FastifyInstance } from "fastify";

import type {
  UsuarioRepository,
  UsuarioResponse,
  UpdateUsuarioData,
  UpdateUsuarioResponse,
  PatchUsuarioData,
  PatchUsuarioResponse,
  CreateUsuarioData,
  CreateUsuarioResponse,
  GetUsuarioResponse,
} from "../../entidades/UsuarioRepository.js";
export class PrismaUsuarioRepository
  implements UsuarioRepository {

    async create(
  data: CreateUsuarioData,
  fastify: FastifyInstance
): Promise<CreateUsuarioResponse> {
  const usuario = await fastify.prisma.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      role: data.role,
      status: data.status,
      senha: data.senha,
      data_cadastro: new Date(),
    },
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return usuario;
}

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

  async patch(
    id: string,
    data: PatchUsuarioData,
    fastify: FastifyInstance
  ): Promise<PatchUsuarioResponse> {

  const usuario =
    await fastify.prisma.usuario.update({
      where: {
        id: id,
      },

      data: {
        ...(data.nome !== undefined && { nome: data.nome }),
        ...(data.email !== undefined && { email: data.email }),
        ...(data.role !== undefined && { role: data.role }),
        ...(data.status !== undefined && { status: data.status }),
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

 async findByEmail(
  email: string,
  fastify: FastifyInstance
): Promise<UsuarioResponse | null> {
  const usuario = await fastify.prisma.usuario.findUnique({
    where: { email },
    select: {
      id: true,
      nome: true,
      email: true,
    },
  });

  return usuario;
}

async findById(
  id: string,
  fastify: FastifyInstance
): Promise<GetUsuarioResponse | null> {
  const usuario = await fastify.prisma.usuario.findUnique({
    where: { id },
    select: {
      id: true,
      nome: true,
      email: true,
      role: true,
      status: true,
    },
  });

  return usuario;
}

}