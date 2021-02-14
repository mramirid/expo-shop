export default interface Product {
  readonly id: string;
  readonly ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  readonly price: number;
}
