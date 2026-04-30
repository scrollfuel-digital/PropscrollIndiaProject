import { atom } from "jotai";
import { DashboardStats } from "@/src/api/dashboardApi";

export const dashboardStatsAtom = atom<DashboardStats | null>(null);
export const dashboardLoadingAtom = atom<boolean>(false);
export const dashboardErrorAtom = atom<string>("");
