import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductDetailThunk, getProductThunk } from "./productThunk";
import { Product, ProductState } from "@/types/productTypes";

const initialState: ProductState = {
  isLoading: false,
  isError: false,
  products: [],
  product: {
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    description: "",
  },
};

export const buildProductSlice = () => {
  const getProducts = getProductThunk();
  const getProductDetail = getProductDetailThunk();
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
            state.products = action.payload;
            state.isError = false;
          }
        )
        .addCase(getProducts.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        })
        .addCase(getProductDetail.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(
          getProductDetail.fulfilled,
          (state, action: PayloadAction<Product>) => {
            state.isLoading = false;
            state.product = action.payload;
            state.isError = false;
          }
        )
        .addCase(getProductDetail.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        });
    },
  });
  return {
    productSlice,
    getProducts,
    getProductDetail,
  };
};
