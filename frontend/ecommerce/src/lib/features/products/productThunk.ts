import { ProductApi } from "@/api/productApi/ProductApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const productApi = new ProductApi();

export const getProductThunk = () => {
  return createAsyncThunk("getProduct", async (query: string) => {
    try {
      const response = await productApi.getProduct(query);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};
