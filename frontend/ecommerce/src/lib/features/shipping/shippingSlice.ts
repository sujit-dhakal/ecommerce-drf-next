import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addShippingAddressThunk,
  getShippingAddressThunk,
} from "./shippingThunk";
import { ShippingAddress, ShippingAddressState } from "@/types/shippingTypes";

const initialState: ShippingAddressState = {
  address: {
    city: "",
    country: "",
    state: "",
    postal_code: "",
    isdefault: false,
  },
  isLoading: false,
  isError: false,
};

export const buildShippingSlice = () => {
  const getShippingAddress = getShippingAddressThunk();
  const addShippingAddress = addShippingAddressThunk();
  const shippingSlice = createSlice({
    name: "shipping",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getShippingAddress.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
      builder
        .addCase(
          getShippingAddress.fulfilled,
          (state, action: PayloadAction<ShippingAddress>) => {
            state.address = action.payload;
            state.isLoading = false;
            state.isError = false;
          }
        )
        .addCase(getShippingAddress.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        }),
        builder.addCase(addShippingAddress.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        });
      builder
        .addCase(
          addShippingAddress.fulfilled,
          (state, action: PayloadAction<ShippingAddress>) => {
            state.address = action.payload;
            state.isLoading = false;
            state.isError = false;
          }
        )
        .addCase(addShippingAddress.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        });
    },
  });
  return {
    shippingSlice,
    getShippingAddress,
    addShippingAddress,
  };
};
