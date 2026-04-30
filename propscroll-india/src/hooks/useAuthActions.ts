import { useAtom, useSetAtom } from "jotai";
import { authUserAtom, authLoadingAtom, authErrorAtom, isAuthenticatedAtom } from "@/src/state/authState";
import { loginApi, registerApi, LoginPayload, RegisterPayload } from "@/src/api/authApi";
import axios from "axios";

export function useAuthActions() {
  const setUser = useSetAtom(authUserAtom);
  const setLoading = useSetAtom(authLoadingAtom);
  const setError = useSetAtom(authErrorAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const login = async (payload: LoginPayload): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const { data } = await loginApi(payload);
      if (data.success) {
        setUser(data.data);
        setIsAuthenticated(true);
        localStorage.setItem("admin_token", data.data._id);
        localStorage.setItem("admin_user", JSON.stringify(data.data));
        return true;
      }
      setError(data.message);
      return false;
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ?? "Login failed. Please try again."
        : "Something went wrong.";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload: RegisterPayload): Promise<boolean> => {
    setLoading(true);
    setError("");
    try {
      const { data } = await registerApi(payload);
      if (data.success) return true;
      setError(data.message);
      return false;
    } catch (err) {
      const message = axios.isAxiosError(err)
        ? err.response?.data?.message ?? "Registration failed. Please try again."
        : "Something went wrong.";
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setError("");
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
  };

  return { login, register, logout };
}
