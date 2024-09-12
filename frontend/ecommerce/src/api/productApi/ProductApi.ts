import { Product } from "@/types/productTypes";
import { IProductApi } from "./IProductApi";
import { client } from "../baseConfig";

export class ProductApi implements IProductApi {
  async getProductDetail(productId: string): Promise<Product> {
    const response = await client.get(`product/${productId}`);
    return response.data;
  }
  async getProducts(query: string): Promise<Product[]> {
    const response = await client.get("products/", {
      params: { name: query },
    });
    return response.data;
  }
}
