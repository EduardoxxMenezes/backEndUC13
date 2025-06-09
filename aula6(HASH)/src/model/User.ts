// src/models/User.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
  } from "typeorm";
  import bcrypt from "bcryptjs";
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ length: 100 })
    name!: string;
  
    @Column({ unique: true })
    email!: string;
  
    @Column()
    password!: string;
  
    @Column({ type: "varchar", length: 15 })
    phone!: string;
  
    @Column({ default: "customer" })
    role!: string;
  
    // 🔐 Guardar a senha anterior para comparar no update
    private _previousPassword?: string;
  
    constructor(name: string, email: string, password: string, phone: string) {
      this.name = name;
      this.email = email;
      this.password = password;
      this.phone = phone;
    }
  
    @BeforeInsert()
    async hashPasswordBeforeInsert() {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
  
    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
      // ⚠️ Só re-hash se a senha tiver sido alterada
      if (this.password !== this._previousPassword) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      }
    }
  
    // Quando o TypeORM carregar a entidade do banco, esse método é chamado aqui pegamos a senha original antes de qualquer update
    setPreviousPassword(password: string) {
      this._previousPassword = password;
    }
  }