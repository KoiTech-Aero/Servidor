import { z } from "zod";
import type { FastifyInstance } from "fastify";
import { PrismaUsuarioRepository } from "../repositories/prisma/PrismaUsuarioRepository.js";
import { loginService } from "../services/login.js";

export async function postLogin(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {

    const schema = z.object({
      email: z.string().email(),
      senha: z.string().min(1),
    });

    const { email, senha } = schema.parse(request.body);

    const repo = new PrismaUsuarioRepository();

    try {
      const result = await loginService({ email, senha }, repo, app);
      
      return reply.send(result);
    } catch (error: any) {
      return reply.status(401).send({
        erro: error.message,
      });
    }
  });
}