import { configureStore, createReducer } from "@reduxjs/toolkit";
import authReducer from "../components/redux/auth/authSlice";
import userReducer from "../components/user/userSlice";
import orderReducer from "../components/orders/orderSlice";
import thunk from "redux-thunk";
import productSlice from "@/components/redux/product/productSlice";
export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authReducer,
    // cart: cartReducer,
    order: orderReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
