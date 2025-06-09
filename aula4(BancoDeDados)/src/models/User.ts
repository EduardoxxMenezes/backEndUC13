import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // nome da tabela
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 100, nullable: false})
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({type: "varchar", length: 255, nullable: false})
    password: string;

    constructor(name: string, email: string, password: string){
        this.name = name;
        this.email = email;
        this.password = password;

    }
}