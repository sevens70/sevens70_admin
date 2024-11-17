import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export function fetchBannerById(id) {
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/banner/${id}`, {
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

export function fetchAllBanner() {
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/banner`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    resolve({ data: { banner: data } });
  });
}

export function createBanner(banner) {
  console.log("banner 05", banner);
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve, reject) => {
    console.log("12345", banner);
    try {
      const response = await fetch(`${BASE_URL}/banner`, {
        method: "POST",
        body: JSON.stringify(banner),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        toast.success("Banner created successfully");
        const data = await response.json();
        resolve({ data });
      } else {
        const errorData = await response.json();
        toast.error("Failed to create banner");
        reject(
          new Error(
            `Request failed with status ${response.status}: ${errorData.message || "Unknown error"}`,
          ),
        );
      }
    } catch (error) {
      toast.error("An error occurred while creating the banner");
      reject(error); // Handle network errors
    }
  });
}

export async function updateBanner(update) {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await fetch(`${BASE_URL}/banner/${update.id}`, {
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
      toast.success("Banner updated successfully");
      return { data, status: response.status };
    } else {
      toast.error("Failed to update banner");
    }
  } catch (error) {
    throw error;
  }
}
