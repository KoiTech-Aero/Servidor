import type { FastifyInstance } from "fastify";
import { PrismaError } from "../../entidades/prismaError.js";
import type {
  PatchUsuarioData,
  PatchUsuarioResponse,
  UpdateUsuarioData,
  UpdateUsuarioResponse,
  UsuarioCreateData,
  UsuarioCreateResponse,
  UsuarioRepository,
  UsuarioResponse,
  CreateUsuarioData,
  CreateUsuarioResponse,
  GetUsuarioResponse,
} from "../../entidades/UsuarioRepository.js";
export class PrismaUsuarioRepository implements UsuarioRepository {
  async create(
    data: UsuarioCreateData,
    fastify: FastifyInstance,
  ): Promise<UsuarioCreateResponse> {
    const exists = await fastify.prisma.usuario.findFirst({
      where: {
        email: data.email,
      },
    });

    if (exists)
      throw new PrismaError(
        `Violação de constraint unica. Uma norma não pode ser criada com esse código (${data.email})`,
        409,
        "P2002",
        "Insert Error",
        "",
      );

    const usuario = await fastify.prisma.usuario.create({
      data: {
        ...data,
        data_cadastro: new Date().toISOString(),
      },
    });

    return { id: usuario.id };
  }

  async read(fastify: FastifyInstance): Promise<UsuarioResponse[]> {
    const usuarios = await fastify.prisma.usuario.findMany({
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
    fastify: FastifyInstance,
  ): Promise<UpdateUsuarioResponse> {
    const usuario = await fastify.prisma.usuario.update({
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
    fastify: FastifyInstance,
  ): Promise<PatchUsuarioResponse> {
    const usuario = await fastify.prisma.usuario.update({
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

  async findByEmail(email: string, fastify: FastifyInstance) {
    const usuario = await fastify.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) return null;

    return usuario;
  }

  async findById(
    id: string,
    fastify: FastifyInstance,
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
