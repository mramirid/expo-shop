export interface CartItem {
  productId: string;
  ownerPushToken: string;
  title: string;
  price: number;
  qty: number;
}

export default interface Cart {
  items: CartItem[];
  totalAmount: number;
}
