import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createTopBanner,
  deleteTopBanner,
  fetchTopBanners,
} from "./topBannersAPI";
// import {
//   createBrand,
//   deleteBrand,
//   fetchBrandById,
//   fetchBrands,
//   updateBrand,
// } from "./brandAPI";

const initialState = {
  status: "idle",
  topBanners: [],
  selectedTopBanner: null,
};

export const fetchTopBannersAsync = createAsyncThunk(
  "topBanner/fetchTopBanner",
  async () => {
    const response = await fetchTopBanners();
    return response.data;
  },
);

export const deleteTopBannerByIdAsync = createAsyncThunk(
  "topBanner/deleteTopBannerById",
  async (id) => {
    const response = await deleteTopBanner(id);
    return response.data;
  },
);
export const createTopBannerAsync = createAsyncThunk(
  "topBanner/create",
  async (banner) => {
    const response = await createTopBanner(banner);
    return response.data;
  },
);

export const topBannerSlice = createSlice({
  name: "topBanner",
  initialState,
  reducers: {
    clearSelectedTopBanner: (state) => {
      state.selectedBrand = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopBannersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTopBannersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.topBanners = action.payload;
      })

      .addCase(deleteTopBannerByIdAsync.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteTopBannerByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.topBanners = state.topBanners.filter(
          (banner) => banner.id !== action.payload.id,
        );
        if (
          state.selectedTopBanner &&
          state.selectedTopBanner.id === action.payload.id
        ) {
          state.selectedTopBanner = null;
        }
      })
      .addCase(deleteTopBannerByIdAsync.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(createTopBannerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createTopBannerAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("error", action.error);
      })
      .addCase(createTopBannerAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.topBanners.push(action.payload);
      });
  },
});
export const { clearSelectedTopBanner } = topBannerSlice.actions;
export const allTopBanner = (state) => state.topBanner?.topBanners;
export const topBannerStatus = (state) => state.topBanner?.status;
export const selectTopBannerById = (state) =>
  state.topBanner?.selectedTopBanner;
export default topBannerSlice.reducer;
