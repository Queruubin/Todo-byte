import { Router } from "express";
import {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} from "../handlers/categoria_handler";



const categoriaRouter = Router();

categoriaRouter.post("/category", crearCategoria as any);
categoriaRouter.get("/categories", obtenerCategorias as any);
categoriaRouter.put("/:id", actualizarCategoria);
categoriaRouter.delete("/:id", eliminarCategoria);

export default categoriaRouter;
