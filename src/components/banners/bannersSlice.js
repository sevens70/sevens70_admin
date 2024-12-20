import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import {
  createBanner,
  fetchAllBanners,
  fetchBannerById,
  updateBanner,
} from "./bannersAPI";
const initialState = {
  banners: [],
  status: "idle",
  totalItems: 0,
  selectedBanner: null,
};

export const fetchBannerByIdAsync = createAsyncThunk(
  "banner/fetchBannerById",
  async (id) => {
    const response = await fetchBannerById(id);
    return response.data;
  },
);
export const fetchAllBannerAsync = createAsyncThunk(
  "banner/allBanner",
  async () => {
    const response = await fetchAllBanners();
    return response.data;
  },
);

export const createBannerAsync = createAsyncThunk(
  "banner/create",
  async (banner) => {
    const response = await createBanner(banner);
    return response.data;
  },
);

export const updateBannerAsync = createAsyncThunk(
  "banner/update",
  async (update) => {
    const response = await updateBanner(update);
    return response.data;
  },
);

export const bannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {
    clearSelectedBanner: (state) => {
      state.selectedBanner = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerByIdAsync.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(fetchBannerByIdAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.selectedBanner = action.payload;
      })
      .addCase(fetchAllBannerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBannerAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.banners = action.payload.banner;
      })
      .addCase(fetchAllBannerAsync.rejected, (state, action) => {
        state.status = "failed";
        // console.error("error", action.error);
      })
      .addCase(createBannerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBannerAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.banners.push(action.payload);
      })
      .addCase(createBannerAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateBannerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBannerAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(updateBannerAsync.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.banners.findIndex(
          (banner) => banner.id === action.payload.id,
        );
        state.banners[index] = action.payload;
        state.selectedBanner = action.payload;
      });
  },
});

export const { clearSelectedBanner } = bannerSlice.actions;

export const selectAllBanner = (state) => state.banner?.banners;
export const selectedBannerById = (state) => state.banner?.selectedBanner;
export const bannerStatus = (state) => state.banner?.status;

export const selectBannerTotalItems = (state) => state.banner?.totalItems;

export default bannerSlice.reducer;
