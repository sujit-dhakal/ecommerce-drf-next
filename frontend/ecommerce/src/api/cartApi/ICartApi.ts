import { CartItems } from "@/types/cartTypes";

export interface ICartApi {
  getCartItems(): Promise<CartItems[]>;
  getCartSum(): Promise<number>;
  updateCartItem(productId: number, newQuantity: number): Promise<CartItems>;
  removeCartItem(productId: number): Promise<void>;
}
