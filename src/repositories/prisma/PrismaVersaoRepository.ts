import type { FastifyInstance } from "fastify";
import type { CreateVersaoData, CreateVersaoResponse, VersaoRepository } from "../../entidades/VersaoRepository.js";

export class PrismaVersaoRepository implements VersaoRepository {
    async create(versaoData: CreateVersaoData, fastify: FastifyInstance): Promise<CreateVersaoResponse> {
        const lastVersao = await fastify.prisma.versao.findMany({
            select: {
                id_norma: true,
                versao_numero: true,
            },
            orderBy: {
                data_publicacao: 'desc'
            },
            take: 1
            
        })

        const id_norma = lastVersao[0]?.id_norma
        const versao_numero = lastVersao[0]?.versao_numero

        if(!id_norma || !versao_numero) throw new Error("Versão não encontrada")

        const UpdateVersao = await fastify.prisma.versao.update({
            where: {
                versaoId: {id_norma, versao_numero}
            },
            data: {
                status: false
            }
        })


        if (!UpdateVersao) throw new Error("Não foi possivel atualizar ultima versao")

        const newVersao = await fastify.prisma.versao.create({
            data: versaoData
        })

        return { versao_numero: newVersao.versao_numero }
    }
}