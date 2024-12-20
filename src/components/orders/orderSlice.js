import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, updateOrder } from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: 0,
};
//we may need more info of current order

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    console.log("user details data 01 order", order);
    const response = await createOrder(order);
    return response.data;
  },
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await updateOrder(order);
      return response.data; // Successful response data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }) => {
    const response = await fetchAllOrders(sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  },
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "success";
        console.log("action payload", action.payload);
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrderAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.orders = action.payload?.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading..";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id,
        );
        state.orders[index] = action.payload;
      })
      .addCase(updateOrderAsync.rejected, (state, action) => {
        console.log("status hit by 01", state);
        state.status = "failed";
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order?.currentOrder;
export const selectOrders = (state) => state.order?.orders;
export const selectTotalOrders = (state) => state.order?.totalOrders;
export const selectStatus = (state) => state.order?.status;

export default orderSlice.reducer;
