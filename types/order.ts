import Cart from "./cart";

export interface AddOrderPayload extends Cart {
  readonly date: number;
}

export default interface Order extends AddOrderPayload {
  readonly id: string;
}

export interface FireGETOrders {
  [orderId: string]: AddOrderPayload;
}
