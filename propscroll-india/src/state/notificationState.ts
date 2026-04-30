import { atom } from "jotai";
import { Notification } from "@/src/api/notificationApi";

export const notificationsAtom = atom<Notification[]>([]);
export const notifLoadingAtom = atom<boolean>(false);
export const unreadCountAtom = atom<number>(0);
