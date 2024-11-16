import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function createTopBanner(payload) {
  const token = sessionStorage.getItem("authToken");
  try {
    const response = await fetch(`${BASE_URL}/topbanner`, {
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
      toast.success("Banner is created successfully.");
      return { data };
    } else {
      const errorText = await response.text();
      console.log("errortext", errorText);
      toast.error("Failed to create banner.");
      // throw new Error(errorText);
    }
  } catch (error) {
    // console.error("Error in createWebsiteInfo:", error.message);
    throw error;
  }
}

// export function fetchTopBanners() {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${BASE_URL}/topbanner`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     });
//     const data = await response.json();
//     resolve({ data });
//   });
// }
export function fetchTopBanners() {
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/topbanner`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        reject(
          `Request failed with status ${response.status}: ${errorMessage}`,
        );
        return;
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(`Fetch error: ${error.message}`);
    }
  });
}

export function deleteTopBanner(id) {
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/topbanner/${id}`, {
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
        message: "An error occurred while deleting the banner",
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
