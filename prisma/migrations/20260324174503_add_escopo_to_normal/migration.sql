/*
  Warnings:

  - Added the required column `escopo` to the `Norma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Norma" ADD COLUMN     "escopo" TEXT NOT NULL;
