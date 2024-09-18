import { Product } from "@/types/productTypes";
import ProductCard from "./ProductCard";

export interface ProductList {
  products: Product[];
}

const ProductList: React.FC<ProductList> = ({ products }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default ProductList;
