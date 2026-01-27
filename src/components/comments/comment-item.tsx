"use client";

import { useState } from "react";
import { MessageSquare, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/shared/user-avatar";
import { UpvoteButton } from "@/components/shared/upvote-button";
import { formatDistanceToNow } from "date-fns";
import type { Comment } from "@/types/comment";

interface CommentItemProps {
  comment: Comment;
  onReply?: (commentId: string) => void;
  onEdit?: (commentId: string) => void;
  onDelete?: (commentId: string) => void;
  depth?: number;
}

export function CommentItem({
  comment,
  onReply,
  onEdit,
  onDelete,
  depth = 0,
}: CommentItemProps) {
  const [showReplies, setShowReplies] = useState(true);
  const maxDepth = 3; // Maximum nesting level

  return (
    <div className="group">
      <div className="flex gap-3">
        <UserAvatar user={comment.author} size="sm" />
        <div className="flex-1 space-y-2">
          {/* Comment Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">
                {comment.author.reputation} rep
              </span>
              <span className="text-xs text-muted-foreground">
                • {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
              </span>
              {comment.isEdited && (
                <span className="text-xs text-muted-foreground italic">
                  (edited)
                </span>
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(comment.id)}>
                    Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(comment.id)}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Comment Content */}
          <div
            className="prose prose-sm max-w-none text-sm"
            dangerouslySetInnerHTML={{ __html: comment.content }}
          />

          {/* Comment Actions */}
          <div className="flex items-center gap-4">
            <UpvoteButton count={comment.upvotes} />
            {depth < maxDepth && onReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onReply(comment.id)}
                className="h-7 text-xs"
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                Reply
              </Button>
            )}
          </div>

          {/* Nested Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {depth < maxDepth && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowReplies(!showReplies)}
                  className="h-7 text-xs text-muted-foreground"
                >
                  {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
                  {comment.replies.length === 1 ? "reply" : "replies"}
                </Button>
              )}

              {showReplies && (
                <div className="space-y-4 border-l-2 border-muted pl-4">
                  {comment.replies.map((reply) => (
                    <CommentItem
                      key={reply.id}
                      comment={reply}
                      onReply={onReply}
                      onEdit={onEdit}
                      onDelete={onDelete}
                      depth={depth + 1}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
