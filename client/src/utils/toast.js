import toast from "react-hot-toast";

export const successNotify = (message) =>
  toast.success(message, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
export const errorNotify = (message) =>
  toast.error(message, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
