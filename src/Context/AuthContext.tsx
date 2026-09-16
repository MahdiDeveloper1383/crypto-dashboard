"use client";
import { IUser } from "@/Interfaces/users/users";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

type AuthContextType = {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  isloading: boolean;
};
export const AuthContext = createContext<AuthContextType | null>(null);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
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
