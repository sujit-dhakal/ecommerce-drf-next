import { UserApi } from "@/api/userAPI/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser, User } from "@/types/userTypes";
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

export const loginUserThunk = () => {
  return createAsyncThunk<loginUser, loginUser>(
    "user/loginUser",
    async (user: loginUser) => {
      try {
        const response = await userApi.loginUser(user);
        return response;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    }
  );
};

export const logoutUserThunk = () => {
  return createAsyncThunk("user/logout", async (token: string) => {
    try {
      const response = await userApi.logOut(token);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};
