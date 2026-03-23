import fastify from "fastify";
import {
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import prismaPlugin from "./plugin/db-connector.js";
import { postNorma } from "./routes/post-norma.js";

export async function buildServer(opts = {}) {
	const app = fastify(opts).withTypeProvider<ZodTypeProvider>();
	app.setValidatorCompiler(validatorCompiler);
	app.setSerializerCompiler(serializerCompiler);

	app.get("/health", (request, reply) => {
		reply.code(200).send({ status: "OK" });
	});

	await app.register(prismaPlugin);
	await app.register(postNorma);

	return app;
}
