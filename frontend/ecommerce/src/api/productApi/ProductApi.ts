import { Product } from "@/types/userTypes";
import { IProductApi } from "./IProductApi";
import { client } from "../baseConfig";

export class ProductApi implements IProductApi {
  async getProduct(query: string): Promise<Product[]> {
    const response = await client.get("products/", {
      params: { name: query },
    });
    return response.data;
  }
}
