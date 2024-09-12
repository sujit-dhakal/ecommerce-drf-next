export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
}

export interface ProductState {
  isLoading: boolean;
  isError: boolean;
  products: Product[];
  product: Product;
}
