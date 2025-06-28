import { Router } from "express";
import {
  crearCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} from "../handlers/categoria_handler";



const categoriaRouter = Router();

categoriaRouter.post("/categorias", crearCategoria as any);
categoriaRouter.get("/", obtenerCategorias);
categoriaRouter.put("/:id", actualizarCategoria);
categoriaRouter.delete("/:id", eliminarCategoria);

export default categoriaRouter;
