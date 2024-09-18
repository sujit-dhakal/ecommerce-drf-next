import { ShippingAddress } from "@/types/shippingTypes";
import { IShippingApi } from "./IShippingApi";
import { client } from "../baseConfig";

export class ShippingApi implements IShippingApi {
  async addAddress(address: ShippingAddress): Promise<ShippingAddress> {
    const response = await client.post("shipping-address/", address);
    return response.data;
  }
  async getAddress(): Promise<ShippingAddress> {
    const response = await client.get("shipping-address/get_by_is_default/");
    return response.data;
  }
}
