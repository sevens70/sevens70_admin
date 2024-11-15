import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT;

export function createOrder(order) {
  return new Promise(async (resolve) => {
    const token = sessionStorage.getItem("authToken");
    const response = await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      body: JSON.stringify(order),
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

export async function updateOrder(order) {
  const token = sessionStorage.getItem("authToken");
  const response = await fetch(`${BASE_URL}/orders/${order.id}`, {
    method: "PATCH",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (response.ok) {
    toast.success("Order updated successfully");
    const data = await response.json();
    return { data };
  } else {
    const errorText = await response.text();
    toast.error("Failed to update order status");
    throw new Error(errorText);
  }
}
export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return new Promise(async (resolve) => {
    const token = sessionStorage.getItem("authToken");
    const response = await fetch(`${BASE_URL}/orders?${queryString}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}
