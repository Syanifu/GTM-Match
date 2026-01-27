"use client";

import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { CommentItem } from "./comment-item";
import { CommentForm } from "./comment-form";
import { EmptyState } from "@/components/shared/empty-state";
import type { Comment } from "@/types/comment";

interface CommentThreadProps {
  targetType: "problem" | "solution";
  targetId: string;
  comments: Comment[];
  totalCount?: number;
}

export function CommentThread({
  targetType,
  targetId,
  comments,
  totalCount,
}: CommentThreadProps) {
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleReply = (commentId: string) => {
    setReplyTo(commentId);
  };

  const handleCancelReply = () => {
    setReplyTo(null);
  };

  const handleSubmitReply = async (content: string) => {
    // In a real app, this would call an API to create the reply
    console.log("Submitting reply to comment:", replyTo, content);
    setReplyTo(null);
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <CommentForm
        targetType={targetType}
        targetId={targetId}
        placeholder="Share your thoughts..."
      />

      {/* Comments List */}
      {comments.length === 0 ? (
        <EmptyState
          icon={MessageSquare}
          title="No comments yet"
          description="Be the first to share your thoughts"
        />
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <CommentItem
                comment={comment}
                onReply={handleReply}
              />

              {/* Reply Form */}
              {replyTo === comment.id && (
                <div className="ml-11">
                  <CommentForm
                    targetType={targetType}
                    targetId={targetId}
                    parentId={comment.id}
                    placeholder="Write your reply..."
                    submitLabel="Post Reply"
                    onSubmit={handleSubmitReply}
                    onCancel={handleCancelReply}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
