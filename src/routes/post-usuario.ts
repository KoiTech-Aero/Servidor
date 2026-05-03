import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { PrismaError } from "../entidades/prismaError.js";
import { PrismaUsuarioRepository } from "../repositories/prisma/PrismaUsuarioRepository.js";
import { createUsuario } from "../services/createUsuario.js";

const bodySchema = z.object({
	nome: z.string(),
	email: z.email(),
	senha: z.string(),
	role: z.enum(["Engenheiro", "Gestor", "Visualizador"]),
	status: z.coerce.boolean(),
});

type requestData = z.infer<typeof bodySchema>;

export const PostUsuario: FastifyPluginAsyncZod = async (fastify) => {
	fastify.post(
		"/usuarios",
		{ schema: { body: bodySchema } },
		async (request, reply) => {
			const data = request.body as requestData;

			const prismaUsuarioRepository = new PrismaUsuarioRepository();
			const usuarioCreate = new createUsuario(prismaUsuarioRepository, fastify);

			try {
				const usuario = usuarioCreate.execute(data);

				return usuario;
			} catch (e) {
				if (e instanceof PrismaError) {
					const typeError = e.typeError;
					const message = e.message;

					if (e.responseStatusCode === 409)
						return reply.status(409).send({ typeError, message });
				}

				if (e instanceof Error) {
					return reply
						.code(500)
						.send({ typeError: e.name, message: e.message });
				}
			}
		},
	);
};
