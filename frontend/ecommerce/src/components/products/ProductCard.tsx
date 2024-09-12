import { Product } from "@/types/productTypes";
import React from "react";
import Link from "next/link";
import { useLocale } from "next-intl";

export interface ProductCard {
  product: Product;
}

const ProductCard: React.FC<ProductCard> = ({ product }) => {
  const locale = useLocale();
  return (
    <div className="border-0 border-collapse border-gray-600 shadow-md rounded-sm w-[100px] m-10">
      <Link href={`/${locale}/product/${product.id}`}>
        <div>
          <h1 className="text-2xl font-medium ">{product.name}</h1>
          <p className="text-red-900">{product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
