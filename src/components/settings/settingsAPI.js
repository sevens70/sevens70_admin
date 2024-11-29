import axiosInstance from "../../lib/axiosInstance";

import toast from "react-hot-toast";

export async function createWebsiteInfo(payload) {
  try {
    const response = await axiosInstance.post("/settings", payload, {
      withCredentials: true, // Ensures cookies are sent
    });

    // Handle success
    toast.success("Data saved successfully");
    return { data: response.data };
  } catch (error) {
    // Handle error
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export async function fetchWebsiteInfo() {
  try {
    const response = await axiosInstance.get("/settings", {
      withCredentials: true, // Ensures cookies are sent
    });

    // Resolve the data
    return { data: response.data };
  } catch (error) {
    // Handle error
    const errorMessage = error.response?.data?.message || "An error occurred";
    toast.error(errorMessage);
    throw new Error(errorMessage);
  }
}
