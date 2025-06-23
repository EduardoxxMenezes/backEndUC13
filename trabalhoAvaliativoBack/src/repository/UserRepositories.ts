import { User } from "../model/User";
import { AppDataSource } from "../database/dataSource";
import { userInfo } from "os";

export class UserRepository{
    private UserRep = AppDataSource.getRepository(User);


    async createUser(nome: string, email: string, senha: string, userType: string){

        const UserCreate = new User(nome,email, senha, userType);
        
        return await this.UserRep.save(UserCreate);
    }

    async findUserByEmail(email: string){

        return await this.UserRep.findOneBy({ email: email});
    }

    async findUserByName(nome: string){
        return await this.UserRep.findOneBy({ name: nome});
    }

    async findUserById(id: number ) {
        return await this.UserRep.findOneBy({ id: id});
    }

    async updateUser(id: number,  fields: Partial<User>){

        const user = this.findUserById(id)
        
        if (user instanceof User) {
            user.setPreviousPassword(user.Password)
            Object.assign(user, fields);
            return await this.UserRep.save(user);
        }
    }

    async deleteUser(id: number){
        const userCreated = await this.findUserById(id);
        if (!userCreated) return null;
        return await this.UserRep.remove(userCreated);
    }

    async findAllUsers() {
        return await this.UserRep.find();
      }
}