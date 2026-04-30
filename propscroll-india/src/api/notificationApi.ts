import { api } from "./axios";

export interface Notification {
  _id: string;
  type: "contact" | "enquiry";
  title: string;
  subtitle: string;
  time: string | null;
}

export const getNotificationsApi = () =>
  api.get<{ success: boolean; data: Notification[] }>("/form/notifications");
