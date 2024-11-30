import axiosInstance from "../../lib/axiosInstance";

export const fetchLoggedInUserOrders = async () => {
  try {
    const { data } = await axiosInstance.get("/orders/own");
    return { data };
  } catch (error) {
    throw error;
  }
};

export const fetchLoggedInUser = async () => {
  try {
    const { data } = await axiosInstance.get("/users/own");
    return { data };
  } catch (error) {
    throw error;
  }
};
export const fetchAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get("/users");
    return { data };
  } catch (error) {
    throw error;
  }
};

export const updateUser = async (update) => {
  try {
    const { data } = await axiosInstance.patch(`/users/${update.id}`, update);
    return { data };
  } catch (error) {
    throw error;
  }
};
