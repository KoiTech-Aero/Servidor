import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from "@prisma/client/runtime/wasm-compiler-edge";
import bcrypt from "bcrypt";
import type { FastifyInstance } from "fastify";
import { PrismaError } from "../entidades/prismaError.js";
import type { UsuarioRepository } from "../entidades/UsuarioRepository.js";

interface CreateUsuarioRequest {
	nome: string;
	email: string;
	senha: string;
	role: "Engenheiro" | "Gestor" | "Visualizador";
	status: boolean;
}

export class createUsuario {
	constructor(
		private repo: UsuarioRepository,
		private fastify: FastifyInstance,
	) {}

	async execute(data: CreateUsuarioRequest) {
		try {
			const senhaHash = await bcrypt.hash(data.senha, 10);

			const usuario = await this.repo.create(
				{
					...data,
					senha: senhaHash,
				},
				this.fastify,
			);

			return usuario;
		} catch (e) {
			if (e instanceof PrismaClientKnownRequestError) {
				if (e.code === "P2002") {
					throw new PrismaError(
						`Violação de constraint unica. Uma norma não pode ser criada com esse código (${data.email})`,
						409,
						e.code,
						"Insert Error",
						e.cause,
					);
				}
			}
			if (e instanceof PrismaClientValidationError) {
				throw new PrismaError(
					e.message,
					409,
					"Undefined",
					"Params Error",
					e.cause,
				);
			}

			if (e instanceof Error) {
				throw new Error(e.message);
			}
		}
	}
}
