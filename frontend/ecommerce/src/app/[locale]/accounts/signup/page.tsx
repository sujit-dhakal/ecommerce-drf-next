"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { registrationSchema } from "../../validations/schema";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { checkEmail, registerUser, checkUserName } from "@/lib/store";
import { useTranslations, useLocale } from "next-intl";

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
  const t = useTranslations("SignUp");
  const locale = useLocale();
  const [userNameAlreadyExist, setUserNameAlreadyExist] =
    useState<boolean>(false);
  const [emailAlreadyExist, setEmailAlreadyExist] = useState<boolean>(false);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const formik = useFormik<RegistrationFormValues>({
    initialValues,
    validationSchema: toFormikValidationSchema(registrationSchema),
    onSubmit: async (values, { resetForm }) => {
      try {
        const checkEmailReponse = await dispatch(checkEmail(values.email));
        console.log(checkEmailReponse);
        if (checkEmailReponse.payload.data.status == 400) {
          setEmailAlreadyExist(true);
          return;
        }
        const checkUserNameResponse = await dispatch(
          checkUserName(values.username)
        );
        console.log(checkUserNameResponse);
        if (checkUserNameResponse.payload.data.status == 400) {
          setUserNameAlreadyExist(true);
          return;
        }
        const response: any = dispatch(registerUser(values));
        setIsRegistered(true);
        console.log(response);
      } catch (error: any) {
        console.log(error.response.data);
      }
      resetForm();
      setTimeout(() => {
        setIsRegistered(false);
        setUserNameAlreadyExist(false);
        setEmailAlreadyExist(false);
      }, 5000);
    },
  });
  return (
    <div className="flex justify-center h-screen my-[50px]">
      {/* side image */}
      {/* signup form */}
      <div className="">
        <form onSubmit={formik.handleSubmit}>
          <div className="text-center">
            <h1 className="text-3xl mb-4">{t("heading")}</h1>
            <h1 className="mb-4">
              {t("alreadyHaveAnAccount")}
              <Link href={`/${locale}/accounts/login`}>
                <span className="text-blue-700">{t("login")}</span>
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
            {emailAlreadyExist ? (
              <div className="text-red-900 text-sm mb-[-20px]">
                Email already exists..
              </div>
            ) : (
              <div></div>
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
            {userNameAlreadyExist ? (
              <div className="text-red-900 text-sm mb-[-20px]">
                UserNameAlreadyExists.
              </div>
            ) : (
              <div></div>
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
              {t("createAccount")}
            </button>
          </div>
        </form>
        {isRegistered ? (
          <div className="text-green-800">
            Check your mail to verify the account.
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default page;
