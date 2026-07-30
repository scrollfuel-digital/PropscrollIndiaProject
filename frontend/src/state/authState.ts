import { atom } from "jotai";
import { AuthUser } from "@/src/api/authApi";

export const authUserAtom = atom<AuthUser | null>(null);
export const authLoadingAtom = atom<boolean>(false);
export const authErrorAtom = atom<string>("");

// Plain writable atom — authenticated only if a real user id is stored
export const isAuthenticatedAtom = atom<boolean>(
  !!localStorage.getItem("admin_token")
);
