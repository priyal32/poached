export interface Notification {
  category: "info" | "error" | "success" | "loading";
  message: string;
  id?: string;
  error?: any;
  progress?: number;
  duration?: number;
  metadata?: NotificationMetadata;
}

interface NotificationMetadata {
  [key: string]: any;
}
