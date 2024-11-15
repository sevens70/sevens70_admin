import toast from "react-hot-toast";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://sevens70.vercel.app"
    : "http://localhost:8080";

export async function createBrand(payload) {
  const token = sessionStorage.getItem("authToken");
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
    console.log("data for brands 00000000 90909", response);
    if (response.ok) {
      const data = await response.json();
      toast.success("Brand is created successfully.");
      return { data };
    } else {
      const errorText = await response.text();
      console.log("errortext", errorText);
      toast.error("Failed to create brand.");
      // throw new Error(errorText);
    }
  } catch (error) {
    // console.error("Error in createWebsiteInfo:", error.message);
    throw error;
  }
}

export function fetchBrands() {
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/brands`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function deleteBrand(id) {
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/brands/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!response.ok) {
        const errorData = await response.json();
        reject(errorData);
      }

      const data = await response.json();
      resolve({ data });
    } catch (err) {
      reject({
        message: "An error occurred while deleting the brand",
        error: err,
      });
    }
  });
}

export function fetchBrandById(id) {
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/brands/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data });
  });
}
export async function updateBrand(update) {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await fetch(`${BASE_URL}/brands/${update.id}`, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      toast.success("Brand Updated successfully");
      return { data, status: response.status };
    } else {
      toast.error("Failed to update brand");
    }
  } catch (error) {
    console.error("Error in update brand:", error);
    throw error;
  }
}
