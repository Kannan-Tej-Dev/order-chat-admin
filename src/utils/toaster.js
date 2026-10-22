import { toast } from "react-toastify";

export const handleSuccess = (msg) => {
  toast.success(msg || "User created successfully!");
};

export const handleError = (err) => {
  toast.error(err || "Something went wrong!");
};
