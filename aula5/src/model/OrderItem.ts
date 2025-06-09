import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Order } from "./Order";
import { Dish } from "./Dish";

@Entity('orderItems')
export class OrderItem {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  private _quantity: number;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;

  @ManyToOne(() => Dish, (dish) => dish.orderItems)
  dish!: Dish;


    /**
     * Getter quantity
     * @return {number}
     */
	public get quantity(): number {
		return this._quantity;
	}

    /**
     * Setter quantity
     * @param {number} value
     */
	public set quantity(value: number) {
		this._quantity = value;
	}

  constructor(quantity: number){
    this._quantity = quantity;
  }
}