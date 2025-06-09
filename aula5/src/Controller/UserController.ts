import { AppDataSource } from "../config/data-source";
import { User } from "../model/User";
import { Request, Response } from "express";

const UserOps = AppDataSource.getRepository(User);

export class UserController{

    async list(req: Request, res: Response) {
        const Users = await UserOps.find();
        res.json(Users);
        return;
    }

    async create(req: Request, res: Response){
        const { name, email, password, role, phone } = req.body;

        if(!name || !email || !password || !role || !phone){
            res.status(201).json({message: 'Todas as informações devem ser preenchidas'})
            return
        }

        const user = new User(name, email, password, role, phone);
        const UserTable = await UserOps.create(user);
        await UserOps.save(UserTable);
        res.status(201).json({ message: "Usuário criado com sucesso!", usuario: UserTable })
        return
    }

    async show(req: Request, res: Response){
        const {id} = req.params;

        const user = await UserOps.findOneBy({id: Number(id)})

        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.json(user);

        }

    async update(req: Request, res: Response){
        const {id} = req.params;
        const { name, email, password, role, phone } = req.body;

        const user = await UserOps.findOneBy({id: Number(id)})

        if(!name || !email || !password || !role || !phone){
            res.status(201).json({message: 'Todas as informações devem ser preenchidas'})
        }
        if(!user){
            res.status(400).json({ message: 'Usuario não encontrado'});
            return;
        }

        user.email = email;
        user.name = name;
        user.password = password;
        user.role = role;
        user.phone = phone;
        
    }

    async delete(req: Request, res: Response){
        const {id} = req.params;

        const user = await UserOps.findOneBy({id: Number(id)});

        if(!user){
            res.status(400).json({ message: 'Usuario não encontrado'});
            return;
        }

        await UserOps.remove(user);

        res.status(204).send;
    }
}