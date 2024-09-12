"use client";
import { useFormik } from "formik";
import { useState } from "react";
import { loginSchema } from "../../validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { actions, loginUser } from "@/lib/store";
import Cookies from "js-cookie";
import { loginUserType } from "@/types/userTypes";
import { useTranslations, useLocale } from "next-intl";

const initialValues: loginUserType = {
  email: "",
  password: "",
};

const page = () => {
  const t = useTranslations("login");
  const locale = useLocale();
  const [loginSuccess, setLoginSuccess] = useState<boolean>(true); // for invalid email or password error
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { values, errors, handleChange, handleSubmit } =
    useFormik<loginUserType>({
      initialValues,
      onSubmit: async (values) => {
        console.log(values);
        try {
          const response: any = await dispatch(loginUser(values));
          console.log(response);
          if (response.payload.status == 200) {
            console.log("login successful");
            dispatch(actions.login());
            Cookies.set("accessToken", response.payload.data.access);
            Cookies.set("refreshToken", response.payload.data.refresh);
            router.push(`/${locale}/profile`);
          } else {
            console.log("login failed");
            setLoginSuccess(false);
          }
          return response;
        } catch (error: any) {
          console.log(error.response.data);
        }
      },
      validationSchema: toFormikValidationSchema(loginSchema),
    });
  const [data, setData] = useState<loginUserType>(initialValues);
  return (
    <div className="flex justify-center h-screen my-[50px]">
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl mb-4">{t("heading")}</h1>
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
            {t("notAUser")}
            <Link href={`/${locale}/accounts/signup`}>
              <span className="text-blue-700">{t("createAccount")}</span>
            </Link>
          </div>
          <div className="mt-6 flex justify-center">
            <button type="submit" className="bg-black py-2 w-full text-white">
              {t("login")}
            </button>
          </div>
          <div>
            {!loginSuccess && (
              <div className="text-red-900 text-sm">
                Invalid Email or Password
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
