import { Router } from "express";
import { criarProduto, listarProduto, selecionarProduto, editarProduto, deletarProduto } from "../controller/ProdutoController";

const rout = Router();

rout.post("/produtos",criarProduto);
rout.get("/produtos", listarProduto);
rout.get("/produtos/:id",selecionarProduto);
rout.put("/produtos/:id", editarProduto);
rout.delete("/produtos/:id",deletarProduto);

export default rout;