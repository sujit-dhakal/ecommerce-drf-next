"use client";
import { useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCartSum, getCartItems, getShippingAddress } from "@/lib/store";
import Paypal from "@/components/paypal/Paypal";

const page = () => {
  const sum = useAppSelector((state) => state.cart.sum);
  const cartItems = useAppSelector((state) => state.cart.itemsInCart);
  const address = useAppSelector((state) => state.shipping.address);
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const fetchAddress = async () => {
    const response = await dispatch(getShippingAddress());
    console.log(response);
  };
  const fetchSum = async () => {
    const response = await dispatch(getCartSum());
    console.log(response);
  };
  const fetchCart = async () => {
    const response = await dispatch(getCartItems());
    console.log(response);
  };
  useEffect(() => {
    fetchAddress();
    fetchCart();
    fetchSum();
  }, []);
  return (
    <>
      <div>
        {address.city} {address.country}
      </div>
      <div>
        {cartItems.map((item) => (
          <div key={item.product.id}>
            <Link href={`/${locale}/product/${item.product.id}`}>
              <div>
                {item.product.name}
                <p>{item.total_price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="">
        <p>Total Sum: {sum} $</p>
      </div>
      <div>
        <Paypal cartItems={cartItems} sum={sum} />
      </div>
    </>
  );
};
export default page;
