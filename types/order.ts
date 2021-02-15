import { Cart } from "./cart";

export default interface Order extends Cart {
  readonly id: string;
  readonly date: number;
}
