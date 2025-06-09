import { stat } from "fs";
import { AppDataSource } from "../config/data-source";
import { Order } from "../model/Order";
import { Request, Response } from "express";

const OrderOps = AppDataSource.getRepository(Order);

export class OrderController{

    async list(req: Request, res: Response) {
        const Order = await OrderOps.find();
        res.json(Order);
        return;
    }

    async create(req: Request, res: Response){
        const { status } = req.body;

        const order = new Order(status);

        if(!status){
            res.status(201).json({message: 'Todas as informações devem ser preenchidas'})
            return;
        }

        const orderTable = OrderOps.create(order);
        const newOrder = await OrderOps.save(orderTable);

        res.status(201).json({ message: "Order created", order: newOrder })
        return;
        
    }

    async show(req: Request, res: Response){
        const {id} = req.params;

        const order = await OrderOps.findOneBy({id: Number(id)})

        if (!order) {
            res.status(404).json({ message: 'Usuário não encontrado' });
            return;
        }
        res.json(order);

        }

    async update(req: Request, res: Response){
        const {id} = req.params;
        const {status} = req.body;

        const order = await OrderOps.findOneBy({id: Number(id)})

        if(!status){
            res.status(201).json({message: 'Todas as informações devem ser preenchidas'})
        }
        if(!order){
            res.status(400).json({ message: 'Usuario não encontrado'});
            return;
        }

        
        order.status = status;
        
        await OrderOps.save(order);

        res.json(order);
    }

    async delete(req: Request, res: Response){
        const {id} = req.params;

        const order = await OrderOps.findOneBy({id: Number(id)});

        if(!order){
            res.status(400).json({ message: 'Usuario não encontrado'});
            return;
        }

        await OrderOps.remove(order);

        res.status(204).send;
    }
}