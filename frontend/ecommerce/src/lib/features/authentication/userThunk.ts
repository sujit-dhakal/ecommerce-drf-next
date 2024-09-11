import { UserApi } from "@/api/userAPI/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserType, User } from "@/types/userTypes";
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
  return createAsyncThunk<loginUserType, loginUserType>(
    "user/loginUser",
    async (user: loginUserType) => {
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
      const response = await userApi.logout(token);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const checkEmailThunk = () => {
  return createAsyncThunk("check-email", async (email: string) => {
    try {
      const response = await userApi.checkEmail(email);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};
export const checkUserNameThunk = () => {
  return createAsyncThunk("check-userName", async (name: string) => {
    try {
      const response = await userApi.checkUserName(name);
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};

export const userProfileThunk = () => {
  return createAsyncThunk("user-profile", async () => {
    try {
      const response = await userApi.userProfile();
      return response;
    } catch (error: any) {
      return error.response.data;
    }
  });
};
