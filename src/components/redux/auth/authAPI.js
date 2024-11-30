import axiosInstance from "../../../lib/axiosInstance";
import toast from "react-hot-toast";

export async function createUser(userData) {
  try {
    const response = await axiosInstance.post("/auth/signup", userData, {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (error) {
    toast.error("Failed to create account");
    throw error;
  }
}

export async function loginUser(loginInfo) {
  try {
    const response = await axiosInstance.post("/auth/login", loginInfo, {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (error) {
    toast.error("Wrong credentials, check again.");
    throw error;
  }
}

export async function checkAuth() {
  try {
    const response = await axiosInstance.get("/auth/check", {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  try {
    const response = await axiosInstance.get("/auth/logout", {
      withCredentials: true,
    });
    return { data: "success" };
  } catch (error) {
    throw error;
  }
}

export async function resetPasswordRequest(email) {
  try {
    const response = await axiosInstance.post(
      "/auth/reset-password-request",
      { email },
      { withCredentials: true },
    );
    return { data: response.data };
  } catch (error) {
    throw error;
  }
}

export async function resetPassword(data) {
  try {
    const response = await axiosInstance.post("/auth/reset-password", data, {
      withCredentials: true,
    });
    return { data: response.data };
  } catch (error) {
    throw error;
  }
}
