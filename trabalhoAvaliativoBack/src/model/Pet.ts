import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcryptjs';


@Entity('Pets')
export class Pets{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'varchar', length: '50', nullable: false})
    name: string;

    @Column({type: 'varchar', length: '50', nullable: false})
    specie: string;

    @Column({type: 'varchar', length: '50', nullable: false})
    genre: string;

    @Column({type: 'boolean', nullable: false})
    isAdoptable: boolean;

    @Column({type: 'int', nullable: false})
    age: number;

    @Column({type: 'varchar', length: 500, nullable: false})
    picture: string;
    
    constructor(name: string, specie: string, genre: string, isAdoptable: boolean, age: number, picture: string){
        this.name = name;
        this.specie = specie;
        this.genre = genre;
        this.isAdoptable = isAdoptable;
        this.age = age;
        this.picture = picture;
    }

}