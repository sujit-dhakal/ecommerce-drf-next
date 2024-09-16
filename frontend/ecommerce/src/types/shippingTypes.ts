export interface ShippingAddress {
  city: string;
  country: string;
  state: string;
  postal_code: string;
  isdefault: false;
}

export interface ShippingAddressState {
  address: ShippingAddress;
  isLoading: boolean;
  isError: boolean;
}
