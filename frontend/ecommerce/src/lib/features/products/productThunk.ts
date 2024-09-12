import { ProductApi } from "@/api/productApi/ProductApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const productApi = new ProductApi();

export const getProductThunk = () => {
  return createAsyncThunk("getProduct", async (query: string) => {
    try {
      const response = await productApi.getProducts(query);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const getProductDetailThunk = () => {
  return createAsyncThunk("getProductDetail", async (productId: string) => {
    try {
      const response = await productApi.getProductDetail(productId);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};
