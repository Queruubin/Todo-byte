-- CreateTable
CREATE TABLE "HistorialTarea" (
    "id" TEXT NOT NULL,
    "tareaId" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "tipoEvento" TEXT NOT NULL,
    "campo" TEXT,
    "valorAnterior" TEXT,
    "valorNuevo" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HistorialTarea_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistorialTarea" ADD CONSTRAINT "HistorialTarea_tareaId_fkey" FOREIGN KEY ("tareaId") REFERENCES "Tarea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorialTarea" ADD CONSTRAINT "HistorialTarea_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
