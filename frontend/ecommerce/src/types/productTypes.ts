export interface Product {
  name: string;
  price: number;
  stock: number;
  description: string;
}

export interface ProductState {
  isLoading: boolean;
  isError: boolean;
  product: Product[];
}
