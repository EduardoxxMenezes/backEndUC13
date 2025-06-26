import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcryptjs';

@Entity('user') // Cria a entidade usuario no banco de dados.
export class User {
 //gera todas as colunas.
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false, length: 30 })
    name: string;

    @Column({ type: 'varchar', nullable: false, length: 50 })
    email: string;

    @Column({ type: 'varchar', nullable: false, length: 50 })
    userType: string;

    @Column({ type: 'varchar', nullable: false, length: 100 })
    password: string; // AGORA é público

    private oldPassword?: string;

    constructor(name: string, email: string, password: string, userType: string) { //constructor
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

    @BeforeInsert() //gera o "salt" do hash, criptografa a senha e adiciona o salt junto.
    async hashInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    @BeforeUpdate() //gera o salt e criptografa a senha sempre que o usuario sofrer um update.
    async hashUpdate() {
        if (this.password !== this.oldPassword) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    setPreviousPassword(password: string) { //salva a senha antiga.
        this.oldPassword = password;
    }
}
