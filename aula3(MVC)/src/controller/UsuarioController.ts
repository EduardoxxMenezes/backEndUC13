import { Request, Response } from "express";
import { Usuario, usuarios } from "../model/Usuario";

// Criar um novo usuário
export const criarUsuario = (req: Request, res: Response) => {
    const { id, nome, email } = req.body;
    if(!id || !nome || !email){
        res.status(400).json({mensagem:"É NECESSARIO INSERIR TODAS AS INFORMAÇÕES"});
        return;
    }else{
    const novoUsuario = new Usuario(id, nome, email);
    usuarios.push(novoUsuario);
    res.status(201).json({ mensagem: "Usuário criado com sucesso!", usuario: novoUsuario });
    }
    return;
  };
  
  // Listar todos os usuários
  export const listarUsuarios = (req: Request, res: Response) => {
    res.status(200).json(usuarios);
  };
  
  // Buscar um usuário por ID
  export const buscarUsuarioPorId = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
     res.status(404).json({ mensagem: "Usuário não encontrado" });
     return;
  }
    res.status(200).json(usuario);
  };
  
  // Atualizar um usuário
  export const atualizarUsuario = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, email } = req.body;
    if(!id){
        res.status(400).json({mensagem: "ID é obrigatório"})
        return;
    }
    if(!nome && !email){
        res.status(400).json({mensagem: "Preencher ao menos um campo (nome/email)"})
        return;
    }
    const usuario = usuarios.find(u => u.id === id);

    if (!usuario){
      res.status(404).json({ mensagem: "Usuário não encontrado" });
      return;
    }
  
    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;
    res.status(200).json({ mensagem: "Usuário atualizado com sucesso!", usuario });
  };
  
  // Deletar um usuário
  export const deletarUsuario = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if(!id){
        res.status(400).json({mensagem: "ID é obrigatório."})
        return;
    }
    const index = usuarios.findIndex(u => u.id === id);
    if (index === -1) {
     res.status(404).json({ mensagem: "Usuário não encontrado" });
     return;
    }
  
    usuarios.splice(index, 1);
    res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
  };