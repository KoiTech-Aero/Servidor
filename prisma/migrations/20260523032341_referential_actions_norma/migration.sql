-- DropForeignKey
ALTER TABLE "NormaReferencia" DROP CONSTRAINT "NormaReferencia_id_norma_referencia_fkey";

-- DropForeignKey
ALTER TABLE "NormaReferencia" DROP CONSTRAINT "NormaReferencia_id_norma_referenciada_fkey";

-- DropForeignKey
ALTER TABLE "NormasTags" DROP CONSTRAINT "NormasTags_id_norma_fkey";

-- DropForeignKey
ALTER TABLE "NormasTags" DROP CONSTRAINT "NormasTags_id_tag_fkey";

-- DropForeignKey
ALTER TABLE "Versao" DROP CONSTRAINT "Versao_id_norma_fkey";

-- AddForeignKey
ALTER TABLE "NormaReferencia" ADD CONSTRAINT "NormaReferencia_id_norma_referencia_fkey" FOREIGN KEY ("id_norma_referencia") REFERENCES "Norma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormaReferencia" ADD CONSTRAINT "NormaReferencia_id_norma_referenciada_fkey" FOREIGN KEY ("id_norma_referenciada") REFERENCES "Norma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormasTags" ADD CONSTRAINT "NormasTags_id_norma_fkey" FOREIGN KEY ("id_norma") REFERENCES "Norma"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormasTags" ADD CONSTRAINT "NormasTags_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Versao" ADD CONSTRAINT "Versao_id_norma_fkey" FOREIGN KEY ("id_norma") REFERENCES "Norma"("codigo") ON DELETE CASCADE ON UPDATE CASCADE;
