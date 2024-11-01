import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchWebsiteInfo } from "./settingsAPI";
// import { fetchWebsiteInfo } from "./websiteInfoAPI";

const initialState = {
  status: "idle",
  websiteInfo: null,
};

export const fetchWebsiteInfoAsync = createAsyncThunk(
  "websiteInfo/fetchWebsiteInfo",
  async () => {
    const response = await fetchWebsiteInfo();
    return response.data;
  },
);

export const websiteInfoSlice = createSlice({
  name: "websiteInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWebsiteInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWebsiteInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.websiteInfo = action.payload;
      });
  },
});

export const selectWebsiteInfo = (state) => state.websiteInfo.websiteInfo;
export const selectWebsiteInfoStatus = (state) => state.websiteInfo.status;

export default websiteInfoSlice.reducer;
