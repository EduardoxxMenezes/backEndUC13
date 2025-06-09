import { Collection, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: 'varchar', length: 50, nullable: false})
    name: string

    @Column({type: 'text', nullable: false})
    description: string

    @Column({type: 'decimal', precision: 6, scale: 2 , nullable: false})
    price: number

    constructor(name: string, description: string, price: number){
        this.name = name;
        this.description = description;
        this.price = price;
    }

}