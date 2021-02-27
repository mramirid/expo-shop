export interface ProductData {
  ownerId: string;
  ownerPushToken: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export default interface Product extends ProductData {
  id: string;
}
