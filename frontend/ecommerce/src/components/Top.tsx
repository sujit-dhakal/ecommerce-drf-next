"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";
import { useLocale } from "next-intl";

const Top = () => {
  const router = useRouter();
  const localActive = useLocale();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    const currentUrl = new URL(window.location.href);
    const newPathName = currentUrl.pathname.replace(
      /^\/(en|np)/,
      `/${nextLocale}`
    );
    router.replace(newPathName);
  };

  return (
    <div className="w-full bg-black text-white items-center h-[48px] flex justify-between">
      <div className="flex-grow text-center">
        Summer Sale for All Swim Suits And Free Express Delivery - OFF 50%!
        <Link href="/swim-suits-link">
          <span className="font-medium">ShopNow</span>
        </Link>
      </div>
      <div className="mr-[100px]">
        <select
          defaultValue={localActive}
          className="border-0 bg-black text-white"
          onChange={onSelectChange}
        >
          <option value="en">English</option>
          <option value="np">Nepali</option>
        </select>
      </div>
    </div>
  );
};

export default Top;
