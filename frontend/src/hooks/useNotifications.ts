import { useEffect } from "react";
import { useAtom, useSetAtom } from "jotai";
import { notificationsAtom, notifLoadingAtom, unreadCountAtom } from "@/src/state/notificationState";
import { getNotificationsApi } from "@/src/api/notificationApi";

export function useNotifications() {
  const [notifications, setNotifications] = useAtom(notificationsAtom);
  const setLoading = useSetAtom(notifLoadingAtom);
  const [unreadCount, setUnreadCount] = useAtom(unreadCountAtom);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const { data } = await getNotificationsApi();
      if (data.success) {
        setNotifications(data.data);
        // unread = all fetched minus what was previously read (stored in localStorage)
        const readIds: string[] = JSON.parse(localStorage.getItem("read_notifs") || "[]");
        setUnreadCount(data.data.filter((n) => !readIds.includes(String(n._id))).length);
      }
    } catch {
      // silently fail for notifications
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = () => {
    const ids = notifications.map((n) => String(n._id));
    localStorage.setItem("read_notifs", JSON.stringify(ids));
    setUnreadCount(0);
  };

  useEffect(() => { fetchNotifications(); }, []);

  return { notifications, unreadCount, markAllRead, fetchNotifications };
}
