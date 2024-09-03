import { UserApi } from "@/api/userAPI/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types/userTypes";
const userApi = new UserApi();

export const registerUserThunk = () => {
  return createAsyncThunk<User, User>(
    "user/registerUser",
    async (user: User) => {
      try {
        const response = await userApi.registerUser(user);
        return response;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    }
  );
};
