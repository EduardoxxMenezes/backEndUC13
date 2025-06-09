import { Request, Response } from 'express';
import { AppDataSource } from '../database/dataSource';
import { User } from "../models/User";
import { Product } from '../models/Products';

const userRepository = AppDataSource.getRepository(Product);

export class ProductController {
    // Listar todos os usuários
    async list(req: Request, res: Response) {
        const products = await userRepository.find();
        res.json(products);
        return;
    }

    // Criar novo usuário
    async create(req: Request, res: Response) {
        const { name, description, price} = req.body;

        const products = userRepository.create({ name, description, price });
        await userRepository.save(products);

     res.status(201).json(products);
         return 
    }

    // Buscar usuário por ID
     async show(req: Request, res: Response) {
        const { id } = req.params;

        const products = await userRepository.findOneBy({ id: Number(id) });

        if (!products) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }

         res.json(products);
         return;
    }

    // Atualizar usuário
    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description,price} = req.body;

        const products = await userRepository.findOneBy({ id: Number(id) });

        if (!products) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return
        }

        products.name = name;
        products.description = description;
        products.price = price;

        await userRepository.save(products);

         res.json(products);
        return
    }

    // Deletar usuário
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const products = await userRepository.findOneBy({ id: Number(id) });

        if (!products) {
             res.status(404).json({ message: 'Usuário não encontrado' });
             return
        }

        await userRepository.remove(products);

         res.status(204).send();
         return;
    }
}