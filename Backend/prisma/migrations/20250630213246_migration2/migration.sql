/*
  Warnings:

  - You are about to drop the `Etiqueta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TareaEtiqueta` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `categoriaId` on table `Tarea` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Tarea" DROP CONSTRAINT "Tarea_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "TareaEtiqueta" DROP CONSTRAINT "TareaEtiqueta_etiquetaId_fkey";

-- DropForeignKey
ALTER TABLE "TareaEtiqueta" DROP CONSTRAINT "TareaEtiqueta_tareaId_fkey";

-- AlterTable
ALTER TABLE "Tarea" ALTER COLUMN "categoriaId" SET NOT NULL;

-- DropTable
DROP TABLE "Etiqueta";

-- DropTable
DROP TABLE "TareaEtiqueta";

-- AddForeignKey
ALTER TABLE "Tarea" ADD CONSTRAINT "Tarea_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
