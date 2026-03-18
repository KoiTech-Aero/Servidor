-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Aprovado', 'Pendente', 'Recusado');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Engenheiro', 'Gestor');

-- CreateTable
CREATE TABLE "NormaReferencia" (
    "id_norma_referencia" TEXT NOT NULL,
    "id_norma_referenciada" TEXT NOT NULL,
    "observacao" TEXT NOT NULL,

    CONSTRAINT "NormaReferencia_pkey" PRIMARY KEY ("id_norma_referencia","id_norma_referenciada")
);

-- CreateTable
CREATE TABLE "NormasTags" (
    "id_norma" TEXT NOT NULL,
    "id_tag" TEXT NOT NULL,

    CONSTRAINT "NormasTags_pkey" PRIMARY KEY ("id_tag","id_norma")
);

-- CreateTable
CREATE TABLE "Norma" (
    "id" TEXT NOT NULL,
    "codigo" VARCHAR(255) NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "area_tecnica" VARCHAR(50) NOT NULL,
    "orgao_emissor" VARCHAR(50) NOT NULL,

    CONSTRAINT "Norma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" VARCHAR(255) NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pendente',
    "data_solicitacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_aprovacao" DATE,
    "id_norma" TEXT NOT NULL,
    "versao_numero" TEXT NOT NULL,
    "id_solicitacao" VARCHAR(255) NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Solicitacao" (
    "id" TEXT NOT NULL,
    "titulo" VARCHAR(150) NOT NULL,
    "motivo" VARCHAR(255) NOT NULL,
    "data_solicitacao" DATE NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pendente',
    "id_norma" TEXT,
    "id_usuario" TEXT NOT NULL,

    CONSTRAINT "Solicitacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(30) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Engenheiro',
    "status" BOOLEAN NOT NULL,
    "data_cadastro" DATE NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Versao" (
    "id_norma" VARCHAR(255) NOT NULL,
    "versao_numero" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "data_publicacao" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "path_file" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Versao_pkey" PRIMARY KEY ("id_norma","versao_numero")
);

-- CreateIndex
CREATE UNIQUE INDEX "Norma_codigo_key" ON "Norma"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "Nota_id_solicitacao_key" ON "Nota"("id_solicitacao");

-- CreateIndex
CREATE UNIQUE INDEX "Solicitacao_id_usuario_key" ON "Solicitacao"("id_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "NormaReferencia" ADD CONSTRAINT "NormaReferencia_id_norma_referencia_fkey" FOREIGN KEY ("id_norma_referencia") REFERENCES "Norma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormaReferencia" ADD CONSTRAINT "NormaReferencia_id_norma_referenciada_fkey" FOREIGN KEY ("id_norma_referenciada") REFERENCES "Norma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormasTags" ADD CONSTRAINT "NormasTags_id_norma_fkey" FOREIGN KEY ("id_norma") REFERENCES "Norma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NormasTags" ADD CONSTRAINT "NormasTags_id_tag_fkey" FOREIGN KEY ("id_tag") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_id_norma_versao_numero_fkey" FOREIGN KEY ("id_norma", "versao_numero") REFERENCES "Versao"("id_norma", "versao_numero") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_id_solicitacao_fkey" FOREIGN KEY ("id_solicitacao") REFERENCES "Solicitacao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_id_norma_fkey" FOREIGN KEY ("id_norma") REFERENCES "Norma"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Solicitacao" ADD CONSTRAINT "Solicitacao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Versao" ADD CONSTRAINT "Versao_id_norma_fkey" FOREIGN KEY ("id_norma") REFERENCES "Norma"("codigo") ON DELETE RESTRICT ON UPDATE CASCADE;
