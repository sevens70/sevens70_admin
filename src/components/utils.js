import toast from "react-hot-toast";

export default function ShowWarningToast(message) {
  toast(message, {
    icon: "⚠️",
    style: {
      border: "1px solid #ffcc00",
      padding: "16px",
      color: "#000",
      fontWeight: "medium",
    },
  });
}

export const getAuthToken = () => sessionStorage.getItem("authToken");
