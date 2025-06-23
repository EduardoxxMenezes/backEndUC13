import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import bcrypt from 'bcryptjs';
import { stringify } from "querystring";

@Entity('User')
export class User{

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', nullable: false, length: 30})
    name: string;

    @Column({type: 'varchar', nullable: false, length: 50})
    email: string;

    @Column({type: 'varchar', nullable: false, length: 50})
    userType: string;

    @Column({ type: 'varchar', nullable: false, length: 50})
    private _Password: string;

    private _OldPassword?: string;
    /**
     * Getter Password
     * @return {string}
     */
	public get Password(): string {
		return this._Password;
	}

    /**
     * Setter Password
     * @param {string} value
     */
	public set Password(value: string) {
		this._Password = value;
	}


    constructor( name: string, email: string, password: string, userType: string){
        this.name = name;
        this.email = email;
        this._Password = password;
        this.userType = userType;
    }

    @BeforeInsert()
    async hashInsert(){
        let salt = await bcrypt.genSalt(10);
        this._Password = await bcrypt.hash(this._Password, salt);
    }

    @BeforeUpdate()
    async hashUpdate(){
        if( this._Password !== this._OldPassword){
            let salt = await bcrypt.genSalt(10);
            this._Password = await bcrypt.hash(this._Password, salt);
        }   
}

    setPreviousPassword(password: string){
        this._OldPassword = password;
    }
}