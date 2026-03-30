import Fastify, { type FastifyError } from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import prismaPlugin from "./plugin/db-connector.js";
import { getNorma } from "./routes/get-norma.js";
import { postNorma } from "./routes/post-norma.js";

export async function buildServer(opts = {}) {
	const fastify = Fastify(opts).withTypeProvider<ZodTypeProvider>();
	fastify.setValidatorCompiler(validatorCompiler);
	fastify.setSerializerCompiler(serializerCompiler);

	fastify.setErrorHandler(async (e: FastifyError, _request, reply) => {
		if (e.code === "FST_ERR_VALIDATION")
			return reply.status(400).send({ typeError: e.code, message: e.message });
		return reply.send(e);
	});

	fastify.get("/health", (_request, reply) => {
		reply.code(200).send({ status: "OK" });
	});

	await fastify.register(prismaPlugin);
	await fastify.register(postNorma);
	await fastify.register(getNorma);

	return fastify;
}
