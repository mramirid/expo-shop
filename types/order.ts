import Cart from './cart';

export interface OrderData extends Cart {
  date: number;
}

export default interface Order extends OrderData {
  id: string;
}
