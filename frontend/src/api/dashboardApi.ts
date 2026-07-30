import { api } from "./axios";

export interface RecentContact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  location: string;
  budgetRange: string;
  message: string;
  createdAt: string;
}

export interface RecentEnquiry {
  _id: string;
  name: string;
  phone: string;
  details: string;
}

export interface DashboardStats {
  totalContacts: number;
  totalEnquiries: number;
  recentContacts: RecentContact[];
  recentEnquiries: RecentEnquiry[];
}

export const getDashboardStatsApi = () =>
  api.get<{ success: boolean; data: DashboardStats }>("/form/dashboard/stats");
