export interface CartItem {
  readonly productId: string;
  title: string;
  readonly price: number;
  qty: number;
}

export default interface Cart {
  items: CartItem[];
  totalAmount: number;
}
