"use client";
import { useAppDispatch } from "@/lib/hooks";
import { addShippingAddress } from "@/lib/store";
import { ShippingAddress } from "@/types/shippingTypes";
import { useFormik } from "formik";
import React from "react";
import { shippingSchema } from "../validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
const initialValues: ShippingAddress = {
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
    validationSchema: toFormikValidationSchema(shippingSchema),
  });
  return (
    <>
      <div className="flex justify-center h-screen my-[50px]">
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                placeholder="city"
                name="city"
                onChange={handleChange}
                value={values.city}
                className="border-0 border-b-2 p-1"
              />
              {errors.city && (
                <div className="text-red-900 text-sm">{errors.city}</div>
              )}
            </div>
            <div>
              <input
                type="text "
                placeholder="country"
                name="country"
                onChange={handleChange}
                value={values.country}
                className="border-0 border-b-2 p-1"
              />
              {errors.country && (
                <div className="text-red-900 text-sm">{errors.country}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="postalcode"
                name="postal_code"
                onChange={handleChange}
                value={values.postal_code}
                className="border-0 border-b-2 p-1"
              />
              {errors.postal_code && (
                <div className="text-red-900 text-sm">{errors.postal_code}</div>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="state"
                name="state"
                onChange={handleChange}
                value={values.state}
                className="border-0 border-b-2 p-1"
              />
              {errors.state && (
                <div className="text-red-900 text-sm">{errors.state}</div>
              )}
            </div>
            <div>
              <label htmlFor="default">Set as default</label>
              <input
                type="checkbox"
                name="isdefault"
                checked={values.isdefault}
                onChange={handleChange}
              />
            </div>
            <button type="submit">Add Shipping Address</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default page;
