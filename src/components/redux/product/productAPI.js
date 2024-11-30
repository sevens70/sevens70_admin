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

// const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

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
//     const response = await fetch(`${BASE_URL}/products`, {
//       method: "POST",
//       body: JSON.stringify(product),
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

// export function updateProduct(update) {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${BASE_URL}/products/${update.id}`, {
//       method: "PATCH",
//       body: JSON.stringify(update),
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

// export function createSubCategories(payload) {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${BASE_URL}/categories/add-subcategory`, {
//       method: "POST",
//       body: JSON.stringify(payload),
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
// export function fetchBrands() {
//   const token = sessionStorage.getItem("authToken");
//   return new Promise(async (resolve) => {
//     const response = await fetch(`${BASE_URL}/brands`, {
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
