import { Product } from "@/types/userTypes";
export interface IProductApi {
  getProduct(query: string): Promise<Product[]>;
}
