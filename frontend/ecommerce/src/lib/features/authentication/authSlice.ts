import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userState } from "@/types/userTypes";
import {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
  checkEmailThunk,
  checkUserNameThunk,
} from "./userThunk";

const initialState: userState = {
  isLoading: false,
  isError: false,
  isAuthenticated: false,
};

export const buildUserSlice = () => {
  const registerUser = registerUserThunk();
  const loginUser = loginUserThunk();
  const logoutUser = logoutUserThunk();
  const checkEmail = checkEmailThunk();
  const checkUserName = checkUserNameThunk();
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
      login(state) {
        state.isAuthenticated = true;
      },
      logout(state) {
        state.isAuthenticated = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(registerUser.fulfilled, (state) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(registerUser.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        })
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(loginUser.rejected, (state) => {
          state.isError = true;
          state.isLoading = false;
        })
        .addCase(logoutUser.pending, (state) => {
          state.isLoading = true;
          state.isError = false;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.isLoading = false;
          state.isError = false;
        })
        .addCase(logoutUser.rejected, (state) => {
          state.isError = true;
        });
    },
  });
  return {
    userSlice,
    actions: userSlice.actions,
    registerUser,
    loginUser,
    logoutUser,
    checkEmail,
    checkUserName,
  };
};
