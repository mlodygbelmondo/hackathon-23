import toast from "react-hot-toast";

export interface Toast {
  message: string;
  type: "success" | "info";
  duration?: number;
}

export const openToast = ({ message, type, duration = 5000 }: Toast) => {
  switch (type) {
    case "success":
      return toast.success(message, {
        duration,
        style: {
          borderRadius: "10px",
          background: "#111",
          color: "#fff",
        },
      });
    case "info":
      return toast.error(message, {
        duration,
        style: {
          borderRadius: "10px",
          background: "#111",
          color: "#fff",
        },
      });
  }
};
