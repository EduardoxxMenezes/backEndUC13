import { Router } from "express";
import { criarUsuario, listarUsuarios, buscarUsuarioPorId, atualizarUsuario, deletarUsuario } from "../controller/UsuarioController";


const router = Router();

router.post("/usuarios", criarUsuario);
router.get("/usuarios", listarUsuarios);
router.get("/usuarios/:id", buscarUsuarioPorId);
router.put("/usuarios/:id", atualizarUsuario);
router.delete("/usuarios/:id", deletarUsuario);

export default router;

