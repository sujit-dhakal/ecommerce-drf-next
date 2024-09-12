"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { getProductDetail } from "@/lib/store";
import { client } from "@/api/baseConfig";

const page = ({
  params,
}: {
  params: {
    productId: string;
  };
}) => {
  const [addToCartValue, setAddToCartValue] = useState("Add to cart");
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);
  const isAuth = useAppSelector((state) => state.user.isAuthenticated);
  const addToCart = async (productId: number) => {
    const response = await client.post(
      "http://127.0.0.1:8000/cart/add_to_cart/",
      {
        product_id: productId,
        quantity: 1,
      }
    );
    setAddToCartValue("Added to Cart");
    console.log(response.data);
  };
  useEffect(() => {
    dispatch(getProductDetail(params.productId));
  }, [dispatch, params.productId]);
  return (
    <div>
      {product.name}
      {isAuth && (
        <>
          <button
            className="bg-orange-500 text-white"
            type="button"
            onClick={() => addToCart(product.id)}
          >
            {addToCartValue}
          </button>
          <button className="bg-blue-950 text-white">Buy Now</button>
        </>
      )}
    </div>
  );
};

export default page;
