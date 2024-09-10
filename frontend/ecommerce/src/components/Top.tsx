import Link from "next/link";

const Top = () => {
  return (
    <div className="w-full bg-black text-white items-center h-[48px] flex justify-between">
      <div className="flex-grow text-center">
        Summer Sale for All Swim Suits And Free Express Delivery - OFF 50%!
        <Link href="/swim-suits-link">
          <span className="font-medium">ShopNow</span>
        </Link>
      </div>
      <div className="mr-[100px]">
        <select name="" id="" className="border-0 bg-black text-white">
          <option value="english">English</option>
          <option value="nepali">Nepali</option>
        </select>
      </div>
    </div>
  );
};

export default Top;
