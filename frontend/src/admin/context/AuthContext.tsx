import React, { createContext, useContext } from "react";
import { useAtomValue } from "jotai";
import { isAuthenticatedAtom, authLoadingAtom, authErrorAtom } from "@/src/state/authState";
import { useAuthActions } from "@/src/hooks/useAuthActions";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const isLoading = useAtomValue(authLoadingAtom);
  const error = useAtomValue(authErrorAtom);
  const { login: loginAction, register: registerAction, logout: logoutAction } = useAuthActions();

  const login = (email: string, password: string) => loginAction({ email, password });
  const register = (username: string, email: string, password: string) =>
    registerAction({ username, email, password });

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, error, login, register, logout: logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
