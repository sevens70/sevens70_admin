import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const getAuthHeaders = () => {
  const token = sessionStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Fetch a banner by ID
 */
export const fetchBannerById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/banner/${id}`, {
      headers: getAuthHeaders(),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const errorData = await response.json();
      toast.error(
        `Failed to fetch banner: ${errorData.message || "Unknown error"}`,
      );
      throw new Error(
        `Error ${response.status}: ${errorData.message || "Unknown error"}`,
      );
    }
  } catch (error) {
    toast.error("An error occurred while fetching the banner");
    throw error;
  }
};

/**
 * Fetch all banners
 */
export const fetchAllBanners = async () => {
  try {
    const response = await fetch(`${BASE_URL}/banner`, {
      headers: getAuthHeaders(),
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      return { data: { banner: data } };
    } else {
      const errorData = await response.json();
      toast.error(
        `Failed to fetch banners: ${errorData.message || "Unknown error"}`,
      );
      throw new Error(
        `Error ${response.status}: ${errorData.message || "Unknown error"}`,
      );
    }
  } catch (error) {
    toast.error("An error occurred while fetching banners");
    throw error;
  }
};

/**
 * Create a new banner
 */
export const createBanner = async (banner) => {
  try {
    const response = await fetch(`${BASE_URL}/banner`, {
      method: "POST",
      body: JSON.stringify(banner),
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Banner created successfully");
      return { data };
    } else {
      const errorData = await response.json();
      toast.error(
        `Failed to create banner: ${errorData.message || "Unknown error"}`,
      );
      throw new Error(
        `Error ${response.status}: ${errorData.message || "Unknown error"}`,
      );
    }
  } catch (error) {
    toast.error("An error occurred while creating the banner");
    throw error;
  }
};

/**
 * Update a banner
 */
export const updateBanner = async (update) => {
  try {
    const response = await fetch(`${BASE_URL}/banner/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: getAuthHeaders(),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Banner updated successfully");
      return { data, status: response.status };
    } else {
      const errorData = await response.json();
      toast.error(
        `Failed to update banner: ${errorData.message || "Unknown error"}`,
      );
      throw new Error(
        `Error ${response.status}: ${errorData.message || "Unknown error"}`,
      );
    }
  } catch (error) {
    toast.error("An error occurred while updating the banner");
    throw error;
  }
};
