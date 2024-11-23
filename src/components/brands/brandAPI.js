import toast from "react-hot-toast";
import { getAuthToken } from "../utils";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

// Create a new brand
export async function createBrand(payload) {
  const token = getAuthToken();
  try {
    const response = await fetch(`${BASE_URL}/brands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Brand created successfully.");
      return { data };
    } else {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      toast.error("Failed to create brand.");
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Error creating brand:", error.message);
    toast.error("An error occurred while creating the brand.");
    throw error;
  }
}

// Fetch all brands
export async function fetchBrands() {
  const token = getAuthToken();
  try {
    const response = await fetch(`${BASE_URL}/brands`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error("Failed to fetch brands.");
    }
  } catch (error) {
    console.error("Error fetching brands:", error.message);
    throw error;
  }
}

// Delete a brand
export async function deleteBrand(id) {
  const token = getAuthToken();
  try {
    const response = await fetch(`${BASE_URL}/brands/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      // toast.success("Brand deleted successfully.");
      return { data };
    } else {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      toast.error("Failed to delete brand.");
      throw new Error(errorData.message || "Unknown error.");
    }
  } catch (error) {
    console.error("Error deleting brand:", error.message);
    throw error;
  }
}

// Fetch a single brand by ID
export async function fetchBrandById(id) {
  const token = getAuthToken();
  try {
    const response = await fetch(`${BASE_URL}/brands/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      return { data };
    } else {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error("Failed to fetch brand by ID.");
    }
  } catch (error) {
    console.error("Error fetching brand by ID:", error.message);
    throw error;
  }
}

// Update an existing brand
export async function updateBrand(update) {
  const token = getAuthToken();
  try {
    const response = await fetch(`${BASE_URL}/brands/${update.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(update),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      toast.success("Brand updated successfully.");
      return { data };
    } else {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      toast.error("Failed to update brand.");
      throw new Error(errorText);
    }
  } catch (error) {
    console.error("Error updating brand:", error.message);
    throw error;
  }
}
