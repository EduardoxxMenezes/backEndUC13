import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OrderItem } from "./OrderItem";
import { DishUser } from "./DishUser";


@Entity('dishes')
export class Dish {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  private _name: string;

  @Column("text")
  private _description: string;

  @Column({ type: "decimal", precision: 6, scale: 2 })
  private _price: number;

  @Column({ default: true })
  private _available: boolean;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.dish)
  orderItems!: OrderItem[];

  @OneToMany(() => DishUser, (dishUser) => dishUser.dish)
  users!: DishUser[];


    /**
     * Getter name
     * @return {string}
     */
	public get name(): string {
		return this._name;
	}

    /**
     * Getter description
     * @return {string}
     */
	public get description(): string {
		return this._description;
	}

    /**
     * Getter price
     * @return {number}
     */
	public get price(): number {
		return this._price;
	}

    /**
     * Getter available
     * @return {boolean}
     */
	public get available(): boolean {
		return this._available;
	}

    /**
     * Setter name
     * @param {string} value
     */
	public set name(value: string) {
		this._name = value;
	}

    /**
     * Setter description
     * @param {string} value
     */
	public set description(value: string) {
		this._description = value;
	}

    /**
     * Setter price
     * @param {number} value
     */
	public set price(value: number) {
		this._price = value;
	}

    /**
     * Setter available
     * @param {boolean} value
     */
	public set available(value: boolean) {
		this._available = value;
	}


	constructor(name: string, description: string, price: number, available: boolean) {
        this._name = name;
        this._description = description;
        this._price = price;
        this._available = available;
	}


}