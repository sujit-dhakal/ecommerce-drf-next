import { CartApi } from "@/api/cartApi/CartApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const cartApi = new CartApi();

export const getCartItemsThunk = () => {
  return createAsyncThunk("getCartItems", async () => {
    try {
      const response = await cartApi.getCartItems();
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const getCartSumThunk = () => {
  return createAsyncThunk("getCartSum", async () => {
    try {
      const response = await cartApi.getCartSum();
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const updateCartItemThunk = () => {
  return createAsyncThunk(
    "updateCartItem",
    async ({
      productId,
      newQuantity,
    }: {
      productId: number;
      newQuantity: number;
    }) => {
      try {
        const response = await cartApi.updateCartItem(productId, newQuantity);
        return response;
      } catch (error: any) {
        return error.response.data;
      }
    }
  );
};

export const removeCartItemThunk = () => {
  return createAsyncThunk("removeCartItem", async (productId: number) => {
    try {
      const response = await cartApi.removeCartItem(productId);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};
