import { api } from "./axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export const loginApi = (payload: LoginPayload) =>
  api.post<AuthResponse>("/auth/login", payload);

export const registerApi = (payload: RegisterPayload) =>
  api.post<AuthResponse>("/auth/register", payload);
