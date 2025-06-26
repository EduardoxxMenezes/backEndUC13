import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcryptjs';

@Entity('user') // use minúsculo para evitar problemas
export class User {

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

    constructor(name: string, email: string, password: string, userType: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

    @BeforeInsert()
    async hashInsert() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    @BeforeUpdate()
    async hashUpdate() {
        if (this.password !== this.oldPassword) {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    }

    setPreviousPassword(password: string) {
        this.oldPassword = password;
    }
}
