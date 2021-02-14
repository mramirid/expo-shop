export default interface CartItem {
  readonly id: string;
  readonly productId: string;
  title: string;
  readonly price: number;
  qty: number;
}
