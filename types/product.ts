export interface AddProductPayload {
  ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
}

export interface UpdateProductPayload {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

export default interface Product extends AddProductPayload {
  readonly id: string;
  readonly ownerId: string;
  title: string;
  imageUrl: string;
  description: string;
  readonly price: number;
}

export interface FireGETProducts {
  [productId: string]: AddProductPayload;
}
