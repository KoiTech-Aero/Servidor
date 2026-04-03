import type { FastifyInstance } from "fastify";
import type { NormaReferenciaRepository } from "../entidades/NormaReferenciaRepository.js";

export class ReadNormaReferencia {
    constructor(
        private repo: NormaReferenciaRepository,
        private fastify: FastifyInstance
    ) { }

    async execute(id: string) {
        return await this.repo.findByNorma(id, this.fastify);
    }
}