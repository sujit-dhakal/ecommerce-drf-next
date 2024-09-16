import { Product } from "./productTypes";
export interface CartItems {
  product: Product;
  quantity: number;
  total_price: number;
}

export interface CartState {
  isLoading: boolean;
  isError: boolean;
  itemsInCart: CartItems[];
  item: CartItems;
  sum: number;
}
