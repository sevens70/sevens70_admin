import { configureStore, createReducer } from "@reduxjs/toolkit";
import authReducer from "../components/redux/auth/authSlice";
import userReducer from "../components/user/userSlice";
import orderReducer from "../components/orders/orderSlice";
import thunk from "redux-thunk";
import productReducer from "@/components/redux/product/productSlice";
import websiteInfoReducer from "../components/settings/settingsSlice";
import bannerReducer from "@/components/banners/bannersSlice";
import brandReducer from "@/components/brands/brandsSlice";
import topBannerReducer from "@/components/topBanners/topBannersSlice";
export const store = configureStore({
  reducer: {
    product: productReducer,
    banner: bannerReducer,
    auth: authReducer,
    // cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    websiteInfo: websiteInfoReducer,
    brands: brandReducer,
    toBanners: topBannerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
