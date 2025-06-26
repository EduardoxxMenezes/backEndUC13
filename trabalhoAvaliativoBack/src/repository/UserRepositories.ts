import { User } from "../model/User";
import { AppDataSource } from "../database/dataSource";
import { userInfo } from "os";

export class UserRepository{
    private UserRep = AppDataSource.getRepository(User);


    async createUser(nome: string, email: string, senha: string, userType: string){ //cria usuario 

        const UserCreate = new User(nome,email, senha, userType);
        
        return await this.UserRep.save(UserCreate); //cria o novo usuario no banco de dados.
    }

    async findUserByEmail(email: string){ //encontra o usuario pelo email

        return await this.UserRep.findOneBy({ email: email});
    }

    async findUserByName(nome: string){ //encontra usuario pelo nome
        return await this.UserRep.findOneBy({ name: nome});
    }

    async findUserById(id: number ) { //encontra usuario pelo ID
        return await this.UserRep.findOneBy({ id: id});
    }

    async updateUser(id: number,  fields: Partial<User>){ //atualia usuario.

        const user = await this.findUserById(id);
        if (user) {
          user.setPreviousPassword(user.password);
          Object.assign(user, fields);
          return await this.UserRep.save(user);
        }
        return null;
    }

    async deleteUser(id: number){ //deleta usuario
        const userCreated = await this.findUserById(id);
        if (!userCreated) return null;
        return await this.UserRep.remove(userCreated);
    }

    async findAllUsers() { //seleciona todos os usuarios no banco de dados
        return await this.UserRep.find();
      }
}
