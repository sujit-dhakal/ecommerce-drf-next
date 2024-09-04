"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { registrationSchema } from "@/app/validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { registerUser } from "@/lib/store";

interface RegistrationFormValues {
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
}

const initialValues: RegistrationFormValues = {
  email: "",
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  confirm_password: "",
};
const page = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const formik = useFormik<RegistrationFormValues>({
    initialValues,
    validationSchema: toFormikValidationSchema(registrationSchema),
    onSubmit: async (values, { resetForm }) => {
      setIsRegistered(true);
      try {
        dispatch(registerUser(values));
      } catch (error: any) {
        console.log(error.response.data);
      }
      resetForm();
      setTimeout(() => {
        setIsRegistered(false);
      }, 10000);
    },
  });
  return (
    <div className="flex justify-center h-screen my-[50px]">
      {/* side image */}
      {/* signup form */}
      <div className="">
        {isRegistered ? (
          <div className="text-white bg-green-600">
            Check your mail to verify the account.
          </div>
        ) : (
          <div></div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl mb-4">Sign Up</h1>
            <h1 className="mb-4">
              Already have an account?{" "}
              <Link href="/accounts/login">
                <span className="text-blue-700">Login</span>
              </Link>
            </h1>
          </div>
          {/* email */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("email")}
              type="text"
              placeholder="email"
              className="border-0 border-b-2 p-1"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-900 text-sm mb-[-20px]">
                {formik.errors.email}
              </div>
            )}
          </div>
          {/* firstname */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("first_name")}
              type="text"
              placeholder="firstname"
              className="border-0 border-b-2 p-1"
            />
            {formik.touched.first_name && formik.errors.first_name && (
              <div className="text-red-900 text-sm mb-[-20px]">
                {formik.errors.first_name}
              </div>
            )}
          </div>
          {/* lastname */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("last_name")}
              type="text"
              placeholder="lastname"
              className="border-0 border-b-2 p-1"
            />
            {formik.touched.last_name && formik.errors.last_name && (
              <div className="text-red-900 text-sm mb-[-20px]">
                {formik.errors.last_name}
              </div>
            )}
          </div>
          {/* username */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("username")}
              type="text"
              placeholder="username"
              className="border-0 border-b-2 p-1"
            />
            {formik.touched.username && formik.errors.username && (
              <div className="text-red-900 text-sm mb-[-20px]">
                {formik.errors.username}
              </div>
            )}
          </div>
          {/* password */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("password")}
              type="password"
              placeholder="password"
              className="border-0 border-b-2 p-1"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-900 text-sm mb-[-20px]">
                {formik.errors.password}
              </div>
            )}
          </div>
          {/* confirm password */}
          <div className="mt-6">
            <input
              {...formik.getFieldProps("confirm_password")}
              type="password"
              placeholder="confirm password"
              className="border-0 border-b-2 p-1"
            />
            {formik.touched.confirm_password &&
              formik.errors.confirm_password && (
                <div className="text-red-900 text-sm mb-[-20px]">
                  {formik.errors.confirm_password}
                </div>
              )}
          </div>
          <div className="mt-6 flex justify-center">
            <button type="submit" className="bg-black py-2 w-full text-white">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
