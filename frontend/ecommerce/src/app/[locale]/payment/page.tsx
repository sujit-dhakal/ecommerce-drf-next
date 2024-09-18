"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getCartSum, getCartItems, getShippingAddress } from "@/lib/store";

const page = () => {
  const sum = useAppSelector((state) => state.cart.sum);
  const cartItems = useAppSelector((state) => state.cart.itemsInCart);
  const address = useAppSelector((state) => state.shipping.address);
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
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
  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(event.target.value);
  };
  return (
    <>
      <div>
        {address.city} {address.country}
      </div>
      <div>
        <h1>Select payment method</h1>
        <label>
          <input
            type="radio"
            name="paymentmethod"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={handlePaymentMethodChange}
          />
          Paypal
        </label>
        <label>
          <input
            type="radio"
            name="paymentmethod"
            value="esewa"
            checked={paymentMethod === "esewa"}
            onChange={handlePaymentMethodChange}
          />
          Esewa
        </label>
      </div>
      <div>
        {cartItems.map((item) => (
          <>
            <Link href={`/${locale}/product/${item.product.id}`}>
              <div>
                {item.product.name}
                <p>{item.total_price}</p>
              </div>
            </Link>
          </>
        ))}
      </div>
      <div>
        <p>Total Sum: {sum}</p>
      </div>
      <div>
        <button></button>
      </div>
    </>
  );
};

export default page;
