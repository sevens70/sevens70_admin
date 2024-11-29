import toast from "react-hot-toast";
import axiosInstance from "../../lib/axiosInstance";

export async function createTopBanner(payload) {
  try {
    const response = await axiosInstance.post("/topbanner", payload, {
      withCredentials: true,
    });
    toast.success("Banner is created successfully.");
    return { data: response.data };
  } catch (error) {
    toast.error("Failed to create banner.");
    throw error;
  }
}

export async function fetchTopBanners() {
  try {
    const response = await axiosInstance.get("/topbanner", {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (error) {
    console.error(
      "Error fetching top banners:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

export async function deleteTopBanner(id) {
  try {
    const response = await axiosInstance.delete(`/topbanner/${id}`, {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (error) {
    throw {
      message: "An error occurred while deleting the banner",
      error,
    };
  }
}

export async function fetchBrandById(id) {
  try {
    const response = await axiosInstance.get(`/brands/${id}`, {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (error) {
    console.error(
      "Error fetching brand by ID:",
      error.response?.data || error.message,
    );
    throw error;
  }
}

export async function updateBrand(update) {
  try {
    const response = await axiosInstance.patch(`/brands/${update.id}`, update, {
      withCredentials: true,
    });
    toast.success("Brand Updated successfully");
    return { data: response.data, status: response.status };
  } catch (error) {
    toast.error("Failed to update brand.");
    throw error;
  }
}
