import axiosInstance from "../../lib/axiosInstance"; // Axios instance for centralized config
import toast from "react-hot-toast";

export async function createOrder(order) {
  try {
    const response = await axiosInstance.post("/orders", order, {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (error) {
    throw error;
  }
}

export async function updateOrder(order) {
  try {
    const response = await axiosInstance.patch(`/orders/${order.id}`, order, {
      withCredentials: true,
    });
    toast.success("Order updated successfully");
    return { data: response.data };
  } catch (error) {
    toast.error("Failed to update order status");
    throw error;
  }
}

export async function fetchAllOrders(sort, pagination) {
  try {
    const params = { ...sort, ...pagination }; // Combine sort and pagination into query params
    const response = await axiosInstance.get("/orders", {
      params,
      withCredentials: true,
    });
    const totalOrders = response.headers["x-total-count"];
    return { data: { orders: response.data, totalOrders: +totalOrders } };
  } catch (error) {
    throw error;
  }
}
