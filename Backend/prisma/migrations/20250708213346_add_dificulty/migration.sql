/*
  Warnings:

  - You are about to drop the column `prioridad` on the `Tarea` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tarea" DROP COLUMN "prioridad",
ADD COLUMN     "dificultad" TEXT NOT NULL DEFAULT 'Easy';
