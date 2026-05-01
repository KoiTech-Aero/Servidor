import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
import type { UsuarioRepository } from "../entidades/UsuarioRepository.js";
import type { FastifyInstance } from "fastify";

interface LoginRequest {
  email: string;
  senha: string;
}

export async function loginService(
  { email, senha }: LoginRequest,
  usuarioRepo: UsuarioRepository,
  fastify: FastifyInstance,
) {
  const usuario = await usuarioRepo.findByEmail(email, fastify);

  if (!usuario) {
    throw new Error("Email ou senha inválidos");
  }

  if (!usuario.status) {
    throw new Error("Usuário desativado");
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    throw new Error("Email ou senha inválidos");
  }

  const token = generateToken({
    id: usuario.id,
    role: usuario.role,
  });

  return {
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    },
    token,
  };
}
