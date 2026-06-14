"use client";
import { IUsers } from "@/Interfaces/users/users";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: IUsers | null;
  setUser: React.Dispatch<React.SetStateAction<IUsers | null>>;
  isloading: boolean;
};
export const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUsers | null>(null);
  const [isloading, setISLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("/api/users/me")
      .then((res) => setUser(res.data.user))
      .finally(() => setISLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, isloading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
