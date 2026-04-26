import Fastify, { type FastifyError } from "fastify";
import cors from "@fastify/cors";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "path";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import prismaPlugin from "./plugin/db-connector.js";
import { getNorma } from "./routes/get-norma.js";
import { postNorma } from "./routes/post-norma.js";
import { postVersao } from "./routes/post-versao.js";
import { postRelacionarNorma } from "./routes/post-relacionar-norma.js";
import { deleteRelacionarNorma } from "./routes/delete-relacionar-norma.js";
import { getRelacionarNorma } from "./routes/get-relacionar-norma.js";
import { getUsuarios } from "./routes/get-usuarios.js";
import { putUsuario }from "./routes/put-usuario.js";


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

  await fastify.register(multipart, {
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  });
  await fastify.register(fastifyStatic, {
    root: path.join(process.cwd(), "uploads"),
    prefix: "/uploads/",
  });
  await fastify.register(cors);
  await fastify.register(prismaPlugin);
  await fastify.register(postNorma);
  await fastify.register(getNorma);
  await fastify.register(postVersao);
  await fastify.register(postRelacionarNorma);
  await fastify.register(deleteRelacionarNorma);
  await fastify.register(getRelacionarNorma);
  await fastify.register(getUsuarios);
  await fastify.register(putUsuario);

  return fastify;
}
