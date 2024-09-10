import { Product } from "@/types/userTypes";

interface ProductList {
  products: Product[];
}

const ProductList: React.FC<ProductList> = ({ products }) => {
  return (
    <div>
      {products.map((product: Product) => (
        <li>{product.name}</li>
      ))}
    </div>
  );
};

export default ProductList;
