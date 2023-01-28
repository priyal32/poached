"use client";

import { useNotificationStore } from "@libs/stores/notification";
import React from "react";
import { toast } from "react-hot-toast";
import type { Notification as NotificationType } from "types/ui";

const useUI = () => {
  const { notification } = useNotificationStore();

  const selectCategory = (notification: NotificationType) => {
    const { id, category, message, duration, progress, error } = notification;
    const toastDuration = duration || 4000;
    switch (category) {
      case "info":
        return toast(message, { id, duration: toastDuration });
      case "success":
        return toast.success(message, { id, duration: toastDuration });
      case "error":
        console.error("Error: ", error);
        return toast.error(message, { id, duration: toastDuration || Infinity });
      case "loading":
        if (progress !== undefined) {
          return toast.loading(
            <div className="flex flex-col space-y-2" style={{ minWidth: "220px" }}>
              loading
            </div>,
            { id },
          );
        } else {
          return toast.loading(message, { id });
        }
    }
  };

  React.useEffect(() => {
    if (notification) {
      selectCategory(notification);
    }
  }, [notification]);

  return null;
};

export default useUI;
