import { nanoid } from "nanoid";
import type { Notification } from "types/ui";
import { create } from "zustand";

type NotificationStore = {
  notification: Notification;
  setNotification: (notification: Notification) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notification: {} as Notification,
  setNotification: (notification) =>
    set(() => ({
      notification: { ...notification, id: notification?.id ?? nanoid() },
    })),
}));
