import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductThunk } from "./productThunk";
import { Product, ProductState } from "@/types/productTypes";

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  product: [],
};

export const buildProductSlice = () => {
  const getProducts = getProductThunk();
  const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getProducts.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(
          getProducts.fulfilled,
          (state, action: PayloadAction<Product[]>) => {
            state.isLoading = false;
            state.product = action.payload;
            state.isError = false;
          }
        )
        .addCase(getProducts.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        });
    },
  });
  return {
    productSlice,
    getProducts,
  };
};
