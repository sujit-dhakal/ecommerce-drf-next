import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  getCartItemsThunk,
  getCartSumThunk,
  updateCartItemThunk,
  removeCartItemThunk,
} from "./cartThunk";
import { CartItems, CartState } from "@/types/cartTypes";

const initialState: CartState = {
  isLoading: false,
  isError: false,
  itemsInCart: [],
  item: {
    product: {
      id: 0,
      name: "",
      price: 0,
      stock: 0,
      description: "",
    },
    quantity: 0,
    total_price: 0,
  },
  sum: 0,
};

export const buildCartSlice = () => {
  const getCartItems = getCartItemsThunk();
  const getCartSum = getCartSumThunk();
  const updateCartItem = updateCartItemThunk();
  const removeCartItem = removeCartItemThunk();
  const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getCartItems.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(
          getCartItems.fulfilled,
          (state, action: PayloadAction<CartItems[]>) => {
            state.isLoading = false;
            state.itemsInCart = action.payload;
            state.isError = false;
          }
        )
        .addCase(getCartItems.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        })
        .addCase(getCartSum.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(
          getCartSum.fulfilled,
          (state, action: PayloadAction<number>) => {
            state.isLoading = false;
            state.sum = action.payload;
            state.isError = false;
          }
        )
        .addCase(getCartSum.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        })
        .addCase(updateCartItem.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(
          updateCartItem.fulfilled,
          (state, action: PayloadAction<CartItems>) => {
            state.isLoading = false;
            state.item = action.payload;
            state.isError = false;
          }
        )
        .addCase(updateCartItem.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        })
        .addCase(removeCartItem.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(removeCartItem.fulfilled, (state) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(removeCartItem.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        });
    },
  });
  return {
    cartSlice,
    getCartItems,
    getCartSum,
    updateCartItem,
    removeCartItem,
  };
};
