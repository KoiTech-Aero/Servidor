-- DropForeignKey
ALTER TABLE "Solicitacao" DROP CONSTRAINT "Solicitacao_id_usuario_fkey";

-- AlterTable
ALTER TABLE "Solicitacao" ALTER COLUMN "id_usuario" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
