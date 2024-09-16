"use client";
import { useAppDispatch } from "@/lib/hooks";
import { addShippingAddress } from "@/lib/store";
import { ShippingAddress } from "@/types/shippingTypes";
import { useFormik } from "formik";
import React from "react";

const initialValues: ShippingAddress = {
  address: "",
  state: "",
  country: "",
  postal_code: "",
  city: "",
  isdefault: false,
};

const page = () => {
  const dispatch = useAppDispatch();
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      console.log(values);
      const response = await dispatch(addShippingAddress(values));
      console.log(response);
      resetForm();
    },
  });
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="address"
          name="address"
          onChange={handleChange}
          value={values.address}
        />
        <input
          type="text"
          placeholder="city"
          name="city"
          onChange={handleChange}
          value={values.city}
        />
        <input
          type="text "
          placeholder="country"
          name="country"
          onChange={handleChange}
          value={values.country}
        />
        <input
          type="text"
          placeholder="postalcode"
          name="postal_code"
          onChange={handleChange}
          value={values.postal_code}
        />
        <input
          type="text"
          placeholder="state"
          name="state"
          onChange={handleChange}
          value={values.state}
        />
        <label htmlFor="default">Set as default</label>
        <input
          type="checkbox"
          name="isdefault"
          checked={values.isdefault}
          onChange={handleChange}
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default page;
