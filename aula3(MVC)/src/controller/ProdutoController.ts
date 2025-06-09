import { Request, Response } from "express";
import { Produto, produtos } from "../model/Produto";

export const criarProduto = (req: Request, res: Response) => {
 const {id, nome, preco, desc, quantidade} = req.body;
    if(!id || !nome || !preco || !desc || !quantidade){
        res.status(400).json({mensgem: "É necessário inserir todas as informações."})
        return;
    }

    const novoProduto = new Produto(id, nome, preco, desc, quantidade);
    produtos.push(novoProduto);
    res.status(201).json({mensagem: "Produto criado com sucesso!"})
    return;
}

export const listarProduto = (req:Request, res: Response) => {
    res.status(200).json(produtos);
}

export const selecionarProduto = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const produto1 = produtos.find(u => u.id == id);
    if(!id){
        res.status(404).json({mensagem: "Produto não encontrado"})
        return;
    }
    res.status(200).json(produto1);
    return;
}

export const editarProduto = (req:Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome, preco, desc, quantidade} = req.body;
    if(!id){
        res.status(400).json({mensgem: "É necessário inserir ID."})
    }
    if( !nome && !preco && !desc && !quantidade){
        res.status(400).json({mensgem: "É necessário inserir pelo menos uma das informações."})
        return;
    }

    const produto1 = produtos.find(u => u.id == id);
    if(!produto1){
        res.status(400).json({mensgem: "Usuario não encontrado"})
    }else{
        produto1.nome = nome || produto1.nome;
        produto1.preco = preco || produto1.preco;
        produto1.desc = desc || produto1.desc;
        produto1.quantidade = quantidade || produto1.quantidade;
    }

    res.status(200).json({ mensagem: "Produto atualizado com sucesso!", produto1});
}

export const deletarProduto = (req:Request, res: Response) => {
    const id = Number(req.params.id);
    const produto1 = produtos.findIndex(u => u.id == id);
    if(!id){
        res.status(404).json({mensagem: "é necessário inserir um ID"})
        return;
    }
    if(produto1 === -1){
        res.status(404).json({mensagem: "Produto não encontrado"})
        return;
    }
    produtos.splice(produto1, 1);
    res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
  };