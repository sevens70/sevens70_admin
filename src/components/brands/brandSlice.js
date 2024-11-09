import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  deleteBrand,
  fetchBrandById,
  fetchBrands,
  updateBrand,
} from "./brandAPI";

const initialState = {
  status: "idle",
  brands: [],
  selectedBrand: null,
};

export const fetchBrandsAsync = createAsyncThunk(
  "brands/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response.data;
  },
);
export const fetchBrandByIdAsync = createAsyncThunk(
  "brand/fetchBrandById",
  async (id) => {
    const response = await fetchBrandById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);
export const deleteBrandByIdAsync = createAsyncThunk(
  "brand/deleteBrandById",
  async (id) => {
    const response = await deleteBrand(id);
    return response.data;
  },
);
export const createBrandAsync = createAsyncThunk(
  "brand/create",
  async (brand) => {
    const response = await createBrand(brand);
    return response.data;
  },
);
export const updateBrandAsync = createAsyncThunk(
  "brand/update",
  async (update) => {
    const response = await updateBrand(update);
    return response.data;
  },
);

export const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    clearSelectedBrand: (state) => {
      state.selectedBrand = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchBrandByIdAsync.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(fetchBrandByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedBrand = action.payload;
      })
      .addCase(deleteBrandByIdAsync.pending, (state) => {
        state.status = "loading...";
      })
      .addCase(deleteBrandByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = state.brands.filter(
          (brand) => brand.id !== action.payload.id,
        );
        if (
          state.selectedBrand &&
          state.selectedBrand.id === action.payload.id
        ) {
          state.selectedBrand = null;
        }
      })
      .addCase(deleteBrandByIdAsync.rejected, (state) => {
        state.status = "failed";
      })

      .addCase(createBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createBrandAsync.rejected, (state, action) => {
        state.status = "failed";
        console.error("error", action.error);
      })
      .addCase(createBrandAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.brands.push(action.payload);
      })
      .addCase(updateBrandAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBrandAsync.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.brands.findIndex(
          (brand) => brand.id === action.payload.id,
        );
        state.brands[index] = action.payload;
        state.selectedBrand = action.payload;
      });
  },
});
export const { clearSelectedBrand } = brandSlice.actions;
export const allBrands = (state) => state.brands?.brands;
export const brandsStatus = (state) => state.brands?.status;
export const selectBrandById = (state) => state.brands?.selectedBrand;
export default brandSlice.reducer;
