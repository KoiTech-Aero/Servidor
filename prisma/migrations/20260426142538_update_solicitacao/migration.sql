/*
  Warnings:

  - You are about to drop the column `id_solicitacao` on the `Nota` table. All the data in the column will be lost.
  - You are about to drop the column `id_norma` on the `Solicitacao` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Nota" DROP CONSTRAINT "Nota_id_solicitacao_fkey";

-- DropForeignKey
ALTER TABLE "Solicitacao" DROP CONSTRAINT "Solicitacao_id_norma_fkey";

-- DropIndex
DROP INDEX "Nota_id_solicitacao_key";

-- AlterTable
ALTER TABLE "Nota" DROP COLUMN "id_solicitacao";

-- AlterTable
ALTER TABLE "Solicitacao" DROP COLUMN "id_norma",
ADD COLUMN     "codigo_norma" VARCHAR(50),
ADD COLUMN     "orgao_emissor" VARCHAR(100),
ADD COLUMN     "versao_norma" VARCHAR(20),
ALTER COLUMN "data_solicitacao" SET DEFAULT CURRENT_TIMESTAMP;
