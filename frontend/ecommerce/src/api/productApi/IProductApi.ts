import { Product } from "@/types/productTypes";
export interface IProductApi {
  getProducts(query: string): Promise<Product[]>;
  getProductDetail(productId: string): Promise<Product>;
}
