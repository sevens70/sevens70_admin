import { configureStore, createReducer } from "@reduxjs/toolkit";
// import productReducer from "../features/product/productSlice";
import authReducer from "../components/redux/auth/authSlice";
// import productSlice from "../components/redux/product/productSlice";
// import cartReducer from "../features/cart/cartSlice";
// import orderReducer from "../features/order/orderSlice";
// import userReducer from "../features/user/userSlice";
import thunk from "redux-thunk";
import { productSlice } from "@/components/redux/product/productSlice";
export const store = configureStore({
  reducer: {
    product: productSlice,
    auth: authReducer,
    // cart: cartReducer,
    // order: orderReducer,
    // user: userReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
