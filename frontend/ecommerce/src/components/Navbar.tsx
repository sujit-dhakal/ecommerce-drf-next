"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { actions, logoutUser } from "@/lib/store";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import SearchBar from "./search/SearchBar";

const Navbar = () => {
  const t = useTranslations("NavBar");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const locale = useLocale();
  let isAuth = useAppSelector((state) => state.user.isAuthenticated);
  const handlelogout = async () => {
    const token = Cookies.get("refreshToken");
    if (token) {
      try {
        const response = await dispatch(logoutUser(token));
        console.log(response);
        if (response.payload.status == 200) {
          dispatch(actions.logout());
          Cookies.remove("accessToken");
          Cookies.remove("refreshToken");
          router.push(`/${locale}/accounts/login`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className="max-w-[1400px] m-auto flex justify-between items-center mt-[48px] h-[38px] mb-[16px]">
        <div className="text-3xl font-bold">
          <Link href="/">EcomNepal</Link>
        </div>
        <div className="text-1xl list-none flex gap-5 items-center">
          <Link href={`/${locale}/home`}>{t("Home")}</Link>
          <Link href={`/${locale}/contact`}>{t("Contact")}</Link>
          {isAuth ? (
            <>
              <li>
                <Link href={`/${locale}/profile`}>Profile</Link>
              </li>
              <li>
                <button onClick={handlelogout}>Logout</button>
              </li>
              <li>
                <Link href={`/${locale}/cart`}>Cart</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href={`/${locale}/accounts/signup`}>{t("SignUp")}</Link>
              </li>
              <li>
                <Link href={`/${locale}/accounts/login`}>{t("Login")}</Link>
              </li>
            </>
          )}
        </div>
        <div>
          <SearchBar />
        </div>
      </div>
      <div>
        <hr />
      </div>
    </>
  );
};

export default Navbar;
