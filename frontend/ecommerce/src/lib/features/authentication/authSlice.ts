import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { userState, User } from "@/types/userTypes";
import { registerUserThunk } from "./userThunk";

const initialState: userState = {
  user: {
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: "",
  },
  isLoading: false,
  isError: false,
};

export const buildUserSlice = () => {
  const registerUser = registerUserThunk();
  const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(registerUser.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(
          registerUser.fulfilled,
          (state, action: PayloadAction<User>) => {
            state.user = action.payload;
          }
        )
        .addCase(registerUser.rejected, (state) => {
          state.isError = true;
        });
    },
  });
  return {
    userSlice,
    registerUser,
  };
};
