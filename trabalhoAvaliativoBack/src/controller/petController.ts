import { Pets } from './../model/Pet';
import { Request, Response } from "express";
import { petRepository } from "../repository/petRepository";
import bcrypt from "bcryptjs";


const petRep = new petRepository();

export class petController{ //cria uma nova classe pet controller para organizar a situação

    async addPet(req: Request, res: Response){ //função de adicionar o pet.
        try{
        const {name, specie, genre, age, picture} = req.body; // puxa as informações.
        const pet = await petRep.addPet(name, specie, genre, true, age, picture); //cria o pet 
        if(!pet){ //se o pet nao tiver criado ele envia erro.
            res.status(404).json({ message: "Ocorreu um erro inesperado ao tentar registrar o animal." })
             return;
         }
              res.status(201).json(pet);
              return;
            } catch (error) {
              res.status(500).json({ error: "Erro ao registrar animal." });
              console.error("Erro ao registrar animal.", error);
              return;
            }
    }
    
  async getAll(req: Request, res: Response) { //pega todos os pets do banco de dados.
    try {
      const pets = await petRep.findAllPets();
      res.json(pets);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao encontrar os animães: ", details: error });
    }
  }

  
  async getById(req: Request, res: Response) { //encontra o pet através do ID.
    try {
      const id = parseInt(req.params.id);
      const pet = await petRep.findPetById(id);
      if (!pet) {
        res.status(404).json({ message: "animal não encontrado." });
        return;
      }

      res.json(pet)
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar pet: ", details: error });
      return;
    }
  }

  
 async update(req: Request, res: Response) { //atualiza os pets
  try {
    const id = parseInt(req.params.id);
    const fieldsToUpdate: Partial<Pets> = req.body;

    const updated = await petRep.updatePet(id, fieldsToUpdate);

    if (!updated) {
      res.status(404).json({ message: "Animal não encontrado." });
      return;
    }

    res.json({ message: "Animal atualizado com sucesso.", updated });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar Animal.", details: error });
  }
}


  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const deleted = await petRep.removePet(id);

      if (!deleted) {
        res.status(404).json({ message: "Animal não encontrado." });
        return;
      }

      res.json({ message: "Animal deletado com sucesso." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao deletar Animal. ", details: error });
      return;
    }
  }
}
