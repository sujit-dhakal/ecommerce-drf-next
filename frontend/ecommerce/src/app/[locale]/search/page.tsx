"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getProducts } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
const page = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.product);

  useEffect(() => {
    if (query) {
      dispatch(getProducts(query));
    }
  }, [query]);
  return (
    <div>
      <h1>Search Results</h1>
      {products.map((product) => (
        <li>{product.name}</li>
      ))}
    </div>
  );
};

export default page;
