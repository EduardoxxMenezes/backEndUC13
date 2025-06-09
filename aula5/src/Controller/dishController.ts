import { AppDataSource } from "../config/data-source";
import { Dish } from "../model/Dish";
import { Request, Response } from "express";

const DishOps = AppDataSource.getRepository(Dish);

export class DishController{

    async list(req: Request, res: Response) {
        const dishes = await DishOps.find();
        res.json(dishes);
        return;
    }

    async create(req: Request, res: Response){
        const { _name, _description, _price, _available } = req.body

        if(!_name && !_description && !_price && !_available){
            res.status(400).json({message: 'Todas as informações devem ser preenchidas'})
            return;
        }

        const dish = new Dish(_name, _description, Number(_price), Boolean(_available));

        const Deshes = DishOps.create(dish);

        await DishOps.save(Deshes);
        
    }

    async show(req: Request, res: Response){
        const {id} = req.params;

        const Dishes = await DishOps.findOneBy({id: Number(id)})

        if (!Dishes) {
            res.status(404).json({ message: 'Prato não encontrado' });
            return;
        }
        res.json(Dishes);

        }

    async update(req: Request, res: Response){
        const {id} = req.params;
        const {name, description, available, price} = req.body;

        const Dishes = await DishOps.findOneBy({id: Number(id)})

        if(!name || !description || !price || !available){
            res.status(201).json({message: 'Todas as informações devem ser preenchidas'})
        }
        if(!Dishes){
            res.status(400).json({ message: 'Prato não encontrado'});
            return;
        }

        Dishes.name = name;
        Dishes.description = description;
        Dishes.available = available;
        Dishes.price = price;

        await DishOps.save(Dishes);

         res.json(Dishes);
    }

    async delete(req: Request, res: Response){
        const {id} = req.params;

        const Dishes = await DishOps.findOneBy({id: Number(id)});

        if(!Dishes){
            res.status(400).json({ message: 'Prato não encontrado'});
            return;
        }

        await DishOps.remove(Dishes);

        res.status(204).send;
    }
}