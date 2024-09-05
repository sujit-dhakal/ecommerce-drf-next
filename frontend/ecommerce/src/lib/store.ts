import { configureStore } from "@reduxjs/toolkit";
import { buildUserSlice } from "./features/authentication/authSlice";

const {
  userSlice,
  registerUser,
  loginUser,
  logoutUser,
  checkEmail,
  checkUserName,
  actions,
} = buildUserSlice();

const makeStore = () => {
  return configureStore({
    reducer: {
      users: userSlice.reducer,
    },
  });
};
export {
  makeStore,
  registerUser,
  loginUser,
  logoutUser,
  checkEmail,
  checkUserName,
  actions,
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
