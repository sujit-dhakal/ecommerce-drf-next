import { CartItems } from "@/types/cartTypes";
import { ICartApi } from "./ICartApi";
import { client } from "../baseConfig";

export class CartApi implements ICartApi {
  async getCartItems(): Promise<CartItems[]> {
    const response = await client.get("cart/");
    return response.data;
  }
  async getCartSum(): Promise<number> {
    const response = await client.get("cart/total_sum/");
    return response.data;
  }
  async updateCartItem(
    productId: number,
    newQuantity: number
  ): Promise<CartItems> {
    const response = await client.post("cart/update_quantity/", {
      product_id: productId,
      quantity: newQuantity,
    });
    return response.data;
  }
  async removeCartItem(productId: number): Promise<void> {
    const response = await client.delete("cart/remove_item_from_cart/", {
      data: { product_id: productId },
    });
    return response.data;
  }
}
