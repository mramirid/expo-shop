export default interface CartItem {
  readonly productId: string;
  title: string;
  readonly price: number;
  qty: number;
}
