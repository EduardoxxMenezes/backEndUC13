import { Request, Response } from "express";
import { UserRepository } from "../repository/UserRepositories";
import bcrypt from "bcryptjs";

const repo = new UserRepository(); //chama o repositório do usuário

export class UserController { //cria uma classe para o controller
  async register(req: Request, res: Response) { //função para registrar usuario
    try {
      const { name, email, password } = req.body;

      const existing = await repo.findUserByEmail(email);

      if (existing) {
        res.status(400).json({ message: "Email já em uso." });
        return;
      }

      const user = await repo.createUser(name, email, password, "cliente");
      if (!user) {
        res.status(500).json({ message: "Ops! Algo não tá certo!" })
        return
      }
      res.status(201).json(user);
      return;
    } catch (error) {
      res.status(500).json({ error: "Erro ao registrar usuário" });
      console.error("Erro ao registrar usuário", error);
      return;
    }
  }

  async login(req: Request, res: Response) { //função para logar usuário.
    try {
      const { email, password } = req.body;
      
      const user = await repo.findUserByEmail(email);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }
      console.log("Usuário encontrado:", user);
  console.log("Senha enviada:", password);
  console.log("Hash no banco:", user.password);

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        res.status(401).json({ message: "Senha inválida." });
        return;
      }

      res.json({ message: "Login autorizado" });
    } catch (error) {
      res.status(500).json({ message: "Erro ao fazer login", details: error });
    }
  }

  async getAll(req: Request, res: Response) { //função para encontrar todos os usuarios.
    try {
      const users = await repo.findAllUsers();
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar usuários", details: error });
    }
  }

  async getById(req: Request, res: Response) { //selecionar um usuario pelo ID.
    try {
      const id = parseInt(req.params.id);
      const user = await repo.findUserById(id);
      if (!user) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar usuário", details: error });
      return;
    }
  }

  async update(req: Request, res: Response) { //atualizar o usuario. 
    try {
      const id = parseInt(req.params.id);
      const { name, email, password } = req.body;

      const fieldsToUpdate = { name, email, password };
      const updated = await repo.updateUser(id, fieldsToUpdate);

      if (!updated) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      res.json({ message: "Usuário atualizado com sucesso.", updated });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao atualizar usuário", details: error });
      return;
    }
  }

  async delete(req: Request, res: Response) { //Função para deletar usuario.
    try {
      const id = parseInt(req.params.id);
      const deleted = await repo.deleteUser(id);

      if (!deleted) {
        res.status(404).json({ message: "Usuário não encontrado." });
        return;
      }

      res.json({ message: "Usuário deletado com sucesso." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao deletar usuário", details: error });
      return;
    }
  }
}
