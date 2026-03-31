import type { FastifyInstance } from "fastify";
import type { CreateVersaoData, CreateVersaoResponse, VersaoRepository } from "../../entidades/VersaoRepository.js";
import z from "zod"

export class PrismaVersaoRepository implements VersaoRepository {
    async create(versaoData: CreateVersaoData, fastify: FastifyInstance): Promise<CreateVersaoResponse> {
        const response = await fastify.prisma.versao.create({
            data: versaoData
        })

        return { versao_numero: response.versao_numero }
    }
}