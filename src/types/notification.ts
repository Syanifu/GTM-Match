import { UserPreview } from "./user";

export type NotificationType =
  | "upvote"
  | "comment"
  | "solution"
  | "badge"
  | "mention"
  | "accepted_solution"
  | "facing_this_too";

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: Date;
  actor?: UserPreview; // Who triggered the notification
}
