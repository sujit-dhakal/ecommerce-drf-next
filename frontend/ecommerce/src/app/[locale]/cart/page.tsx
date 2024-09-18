"use client";
import { useEffect, useState } from "react";
import { CartItems } from "@/types/cartTypes";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  getCartItems,
  getCartSum,
  removeCartItem,
  updateCartItem,
} from "@/lib/store";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";

const page = () => {
  const [isEmpty, setIsEmpty] = useState(false);
  const router = useRouter();
  const locale = useLocale();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.itemsInCart);
  const sum = useAppSelector((state) => state.cart.sum);

  const fetchData = async () => {
    const response = await dispatch(getCartItems());
    console.log(response.payload == 0);
    if (response.payload == 0) {
      setIsEmpty(true);
    }
  };

  const fetchSum = async () => {
    const response = await dispatch(getCartSum());
    console.log(response);
  };

  const removeItem = async (productId: number) => {
    await dispatch(removeCartItem(productId));
    await fetchData();
    await fetchSum();
  };

  const handleQuantityChange = async (
    productId: number,
    newQuantity: number
  ) => {
    await dispatch(updateCartItem({ productId, newQuantity }));
    await fetchData();
    await fetchSum();
  };

  const handleProceed = () => {
    router.push(`/${locale}/payment/`);
  };
  useEffect(() => {
    fetchData();
    fetchSum();
  }, []);
  return (
    <div>
      {isEmpty ? (
        <div>
          <p>No items in cart.</p>
          <p>
            <Link href={`/${locale}/home`}>Add some items</Link>
          </p>
        </div>
      ) : (
        <div>
          {cartItems.map((item: CartItems) => (
            <div key={item.product.id}>
              <table>
                <thead>
                  <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{item.product.id}</td>
                    <td>{item.product.name}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.product.id,
                            parseInt(e.target.value)
                          )
                        }
                        min={1}
                        max={10}
                      />
                    </td>
                    <td>{item.total_price}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          <h1>{sum}</h1>
          <button onClick={handleProceed}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default page;
