export interface CartItem {
  readonly productId: string;
  title: string;
  readonly price: number;
  qty: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}
