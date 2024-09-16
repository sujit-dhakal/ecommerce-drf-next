import { ShippingApi } from "@/api/shippingApi/ShippingApi";
import { ShippingAddress } from "@/types/shippingTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";

const shipApi = new ShippingApi();

export const getShippingAddressThunk = () => {
  return createAsyncThunk("getShippingAddress", async () => {
    try {
      const response = await shipApi.getAddress();
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};
export const addShippingAddressThunk = () => {
  return createAsyncThunk(
    "addShippingAddress",
    async (address: ShippingAddress) => {
      try {
        const response = await shipApi.addAddress(address);
        return response;
      } catch (error: any) {
        return error.response.data;
      }
    }
  );
};
