import { UserPreview } from "./user";

export type CommentTargetType = "problem" | "solution";

export interface Comment {
  id: string;
  content: string; // Rich text HTML
  author: UserPreview;
  parentId?: string; // For nested replies
  targetType: CommentTargetType;
  targetId: string;
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
  isEdited: boolean;
  replies?: Comment[]; // Nested structure
}
