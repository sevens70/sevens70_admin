import toast from "react-hot-toast";
import axiosInstance from "../../../lib/axiosInstance";
const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;
export const fetchProductById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return { data };
  } catch (error) {
    throw error;
  }
};

export const fetchAllProducts = async () => {
  try {
    const { data } = await axiosInstance.get("/products");
    return { data: { products: data } };
  } catch (error) {
    throw error;
  }
};
export const createProduct = async (product) => {
  try {
    const { data } = await axiosInstance.post("/products", product);
    toast.success("Product created successfully");
    return { data };
  } catch (error) {
    toast.error("Failed to create product");
    throw error;
  }
};

export const updateProduct = async (update) => {
  try {
    const { data, status } = await axiosInstance.patch(
      `/products/${update.id}`,
      update,
    );
    toast.success("Product updated successfully");
    return { data, status };
  } catch (error) {
    toast.error("Failed to update product");
    throw error;
  }
};

export const fetchAllCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories");
    return { data: { categories: data } };
  } catch (error) {
    throw error;
  }
};

// export const fetchProductsByFilters = async (
//   filter,
//   sort,
//   pagination,
//   admin
// ) => {
//   try {
//     const params = {
//       ...filter,
//       ...sort,
//       ...pagination,
//       admin: admin || undefined,
//     };

//     const { data, headers } = await axiosInstance.get("/products", { params });
//     const totalItems = headers["x-total-count"];
//     return { data: { products: data, totalItems: +totalItems } };
//   } catch (error) {
//     throw error;
//   }
// };
export function fetchProductsByFilters(filter, sort, pagination, admin) {
  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  if (admin) {
    queryString += `admin=true`;
  }
  const token = sessionStorage.getItem("authToken");
  return new Promise(async (resolve) => {
    const response = await fetch(`${BASE_URL}/products?${queryString}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: +totalItems } });
  });
}
export const fetchCategories = async () => {
  try {
    const { data } = await axiosInstance.get("/categories");
    return { data };
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const fetchSubcategories = async (category) => {
  try {
    const { data } = await axiosInstance.get(
      `/categories/get-subcategories/${category}`,
    );
    return { data };
  } catch (error) {
    throw error;
  }
};

export const createSubCategories = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      "/categories/add-subcategory",
      payload,
    );
    return { data };
  } catch (error) {
    console.error("Error creating subcategories:", error);
    throw error;
  }
};

export const fetchBrands = async () => {
  try {
    const { data } = await axiosInstance.get("/brands");
    return { data };
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};

// import toast from "react-hot-toast";

// const BASE_URL =
//   process.env.NODE_ENV === "production"
//     ? "https://xartso-server-xpr7.vercel.app"
//     : "http://localhost:8080";

// export function fetchProductById(id) {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${BASE_URL}/products/${id}`, {
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

// export function fetchAllProducts() {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${BASE_URL}/products`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     });
//     const data = await response.json();
//     resolve({ data: { products: data } });
//   });
// }

// export function fetchAllCategories() {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${BASE_URL}/categories`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     });
//     const data = await response.json();
//     resolve({ data: { categories: data } });
//   });
// }

// export function createProduct(product) {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     console.log("12345", product);
//     const response = await fetch(`${BASE_URL}/products`, {
//       method: "POST",
//       body: JSON.stringify(product),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     });
//     if (response.ok) {
//       toast.success("Product created successfully");
//       const data = await response.json();
//       resolve({ data });
//     } else {
//       toast.error("Failed to create product");
//     }
//   });
// }

// export async function updateProduct(update) {
//   const token = sessionStorage.getItem("authToken");
//   try {
//     const response = await fetch(`${BASE_URL}/products/${update.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(update),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     });
//     if (response.ok) {
//       const data = await response.json();
//       toast.success("Product Updated successfully");
//       return { data, status: response.status };
//     } else {
//       toast.error("Failed to update product");
//     }
//   } catch (error) {
//     console.error("Error in updateProduct:", error);
//     throw error;
//   }
// }

// export function fetchProductsByFilters(filter, sort, pagination, admin) {
//   let queryString = "";
//   for (let key in filter) {
//     const categoryValues = filter[key];
//     if (categoryValues.length) {
//       queryString += `${key}=${categoryValues}&`;
//     }
//   }
//   for (let key in sort) {
//     queryString += `${key}=${sort[key]}&`;
//   }
//   for (let key in pagination) {
//     queryString += `${key}=${pagination[key]}&`;
//   }
//   if (admin) {
//     queryString += `admin=true`;
//   }
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${BASE_URL}/products?${queryString}`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     });
//     const data = await response.json();
//     const totalItems = await response.headers.get("X-Total-Count");
//     resolve({ data: { products: data, totalItems: +totalItems } });
//   });
// }

// export function fetchCategories() {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${BASE_URL}/categories`, {
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
// export function fetchSubcategories(category) {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(
//       `${BASE_URL}/categories/get-subcategories/${category}`,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         credentials: "include",
//       },
//     );
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// export function createSubCategories(payload) {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     console.log("12345", payload);
//     const response = await fetch(`${BASE_URL}/categories/add-subcategory`, {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       credentials: "include",
//     });
//     console.log("response message 0122", response);
//     const data = await response.json();
//     resolve({ data });
//   });
// }

// // export function fetchBrands() {
// //   const token = sessionStorage.getItem("authToken");
// //   return new Promise(async (resolve) => {
// //     const response = await fetch(`${BASE_URL}/brands`, {
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       credentials: "include",
// //     });
// //     const data = await response.json();
// //     resolve({ data });
// //   });
// // }
