import type { FastifyInstance } from "fastify";
import type {
    UsuarioRepository,
    UsuarioResponse,
} from "../../entidades/UsuarioRepository.js";

export class PrismaUsuarioRepository
    implements UsuarioRepository {
    async read(
        fastify: FastifyInstance
    ): Promise<UsuarioResponse[]> {
        const usuarios = await fastify.prisma.usuario.findMany({
            select: {
                id: true,
                nome: true,
                email: true,
            },
        });

        return usuarios;
    }
}