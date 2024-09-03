"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { loginSchema } from "@/app/validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const page = () => {
  const router = useRouter();
  const { values, errors, handleChange, handleSubmit } =
    useFormik<LoginFormValues>({
      initialValues,
      onSubmit: async (values) => {
        console.log(values);
        router.push("/profile");
      },
      validationSchema: toFormikValidationSchema(loginSchema),
    });
  const [data, setData] = useState<LoginFormValues>(initialValues);
  return (
    <div className="flex justify-center h-screen my-[50px]">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl mb-4">Login</h1>
          </div>
          {/* email */}
          <div className="mt-6">
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
              value={values.email}
              className="border-0 border-b-2 p-1"
            />
            {errors.email && (
              <div className="text-red-900 text-sm">{errors.email}</div>
            )}
          </div>
          {/* password */}
          <div className="mt-6">
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChange}
              value={values.password}
              className="border-0 border-b-2 p-1"
            />
            {errors.password && (
              <div className="text-red-900 text-sm">{errors.password}</div>
            )}
          </div>
          <div className="mt-6">
            Not a User?{" "}
            <Link href="/accounts/signup">
              <span className="text-blue-700">Create an account</span>
            </Link>
          </div>
          <div className="mt-6 flex justify-center">
            <button type="submit" className="bg-black py-2 w-full text-white">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
