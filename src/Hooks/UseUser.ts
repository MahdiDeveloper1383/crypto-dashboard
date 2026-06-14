import { AuthContext } from "@/Context/AuthContext";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUSer must be used within a CartProvider");
  }
  return context;
};
