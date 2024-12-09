import { toast } from "react-hot-toast";

export const handleToast = (status: string, type: string) => {
  switch (type) {
    case "success":
      toast.success(status, { duration: 2000 });
      break;
    case "error":
      toast.error(status);
      break;
    default:
      toast(status);
  }
};
