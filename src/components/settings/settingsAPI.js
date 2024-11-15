import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function createWebsiteInfo(payload) {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await fetch(`${BASE_URL}/settings`, {
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
      toast.success("Data saved successfully");
      return { data };
    } else {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  } catch (error) {
    // console.error("Error in createWebsiteInfo:", error.message);
    throw error;
  }
}

export function fetchWebsiteInfo() {
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/settings`, {
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
