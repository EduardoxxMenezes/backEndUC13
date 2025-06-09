import { User } from "./User";
import { Dish } from "./Dish";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";

@Entity('DishUser')
export class DishUser{

    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.dishes)
    user!: User;
  
    @ManyToOne(() => Dish, (dish) => dish.users)
    dish!: Dish;

}