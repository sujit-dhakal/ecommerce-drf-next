"use client";

import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { actions, logoutUser } from "@/lib/store";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  let isAuth = useAppSelector((state) => state.users.isAuthenticated);
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
          router.push("/accounts/login");
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
          <Link href="/home">Home</Link>
          <Link href="/contact">Contact</Link>
          {isAuth ? (
            <>
              <li>
                <Link href="/profile">Profile</Link>
              </li>
              <li>
                <button onClick={handlelogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/accounts/signup">SignUp</Link>
              </li>
              <li>
                <Link href="/accounts/login">Login</Link>
              </li>
            </>
          )}
        </div>
        <div>
          <input
            type="text"
            className="bg-gray-100 h-[38px] text-center text-[13px] w-[243px]"
            placeholder="What are you looking for?"
          />
        </div>
      </div>
      <div>
        <hr />
      </div>
    </>
  );
};

export default Navbar;
