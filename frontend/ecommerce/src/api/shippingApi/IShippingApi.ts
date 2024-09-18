import { ShippingAddress } from "@/types/shippingTypes";

export interface IShippingApi {
  getAddress(): Promise<ShippingAddress>;
  addAddress(address: ShippingAddress): Promise<ShippingAddress>;
}
