"use client";
import { useAppDispatch } from "@/lib/hooks";
import { userProfile, RootState } from "@/lib/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
const page = () => {
  const dispatch = useAppDispatch();
  const profile = useSelector((state: RootState) => state.user.user);
  useEffect(() => {
    const data = dispatch(userProfile());
    console.log(data);
  }, [dispatch]);
  return (
    <div>
      <h1>{profile.username}</h1>
      <p>{profile.first_name}</p>
      <p>{profile.last_name}</p>
    </div>
  );
};

export default page;
