import { Pets } from "../model/Pet";
import { AppDataSource } from "../database/dataSource";
import { isatty } from "tty";

export class petRepository {
  private petRep = AppDataSource.getRepository(Pets);

  async addPet(
    name: string,
    specie: string,
    genre: string,
    isAdoptable: boolean,
    age: number,
    picture: string
  ) {
    const petCreate = new Pets(name, specie, genre, isAdoptable, age, picture);

    return this.petRep.save(petCreate);
  }
  async findPetById(id: number) {
    return await this.petRep.findOneBy({ id: id });
  }
  async findPetByName(name: string) {
    return await this.petRep.findOneBy({ name: name });
  }
  async findPetByAge(age: number) {
    return await this.petRep.findOneBy({ age: age });
  }
  async findPetBySpecie(specie: string) {
    return await this.petRep.findOneBy({ specie: specie });
  }
  async updatePet(id: number, fields: Partial<Pets>) {
    const pet = await this.findPetById(id);
    if (!pet) return null;

    Object.assign(pet, fields);
    return await this.petRep.save(pet);
  }
  async removePet(id: number) {
    const petCreated = await this.findPetById(id);
    console.log("Pet encontrado para deletar:", petCreated);
    if (!petCreated) return null;
    return await this.petRep.remove(petCreated);
  }

  async findAllPets() {
    return await this.petRep.find();
  }
}
