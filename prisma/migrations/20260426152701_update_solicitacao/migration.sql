/*
  Warnings:

  - You are about to drop the `Solicitacao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Solicitacao" DROP CONSTRAINT "Solicitacao_id_usuario_fkey";

-- DropTable
DROP TABLE "Solicitacao";

-- CreateTable
CREATE TABLE "SolicitacaoNorma" (
    "id" TEXT NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "motivo" VARCHAR(255) NOT NULL,
    "data_solicitacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'Pendente',
    "codigo_norma" VARCHAR(50),
    "versao_norma" VARCHAR(20),
    "orgao_emissor" VARCHAR(100),
    "id_usuario" TEXT,

    CONSTRAINT "SolicitacaoNorma_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SolicitacaoNorma" ADD CONSTRAINT "SolicitacaoNorma_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
