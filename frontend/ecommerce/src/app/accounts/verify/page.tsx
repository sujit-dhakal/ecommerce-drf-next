"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/accounts/login");
    }, 5000);
  }, []);
  return (
    <div>
      <p>Email Verified.</p>
      <p>Redirecting</p>
      <p>Wait few seconds.</p>
    </div>
  );
};

export default page;
