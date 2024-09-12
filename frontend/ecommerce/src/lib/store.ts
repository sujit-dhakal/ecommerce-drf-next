import { configureStore } from "@reduxjs/toolkit";
import { buildUserSlice } from "./features/authentication/authSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { buildProductSlice } from "./features/products/productSlice";
import { buildCartSlice } from "./features/cart/cartSlice";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["isAuthenticated"],
};

const {
  userSlice,
  registerUser,
  loginUser,
  logoutUser,
  checkEmail,
  checkUserName,
  actions,
  userProfile,
} = buildUserSlice();

const { productSlice, getProducts, getProductDetail } = buildProductSlice();

const { cartSlice, getCartItems, getCartSum, updateCartItem, removeCartItem } =
  buildCartSlice();

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer);

const makeStore = () => {
  return configureStore({
    reducer: {
      user: persistedUserReducer,
      product: productSlice.reducer,
      cart: cartSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
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
  userProfile,
  getProducts,
  getProductDetail,
  getCartItems,
  getCartSum,
  updateCartItem,
  removeCartItem,
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
