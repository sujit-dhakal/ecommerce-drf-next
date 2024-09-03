"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);
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
            <li>
              <Link href="/profile">Profile</Link>
            </li>
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
