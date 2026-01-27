"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { useAuthStore } from "@/stores/auth-store";
import { toast } from "sonner";

interface CommentFormProps {
  targetType: "problem" | "solution";
  targetId: string;
  parentId?: string;
  onSubmit?: (content: string) => Promise<void>;
  onCancel?: () => void;
  placeholder?: string;
  submitLabel?: string;
}

export function CommentForm({
  targetType,
  targetId,
  parentId,
  onSubmit,
  onCancel,
  placeholder = "Add a comment...",
  submitLabel = "Post Comment",
}: CommentFormProps) {
  const { isAuthenticated } = useAuthStore();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in to comment");
      return;
    }

    if (!content.trim() || content === "<p></p>") {
      toast.error("Please enter a comment");
      return;
    }

    try {
      setIsSubmitting(true);

      if (onSubmit) {
        await onSubmit(content);
      } else {
        // Default behavior - simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        toast.success("Comment posted successfully");
      }

      // Reset form
      setContent("");
    } catch (error) {
      toast.error("Failed to post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setContent("");
    if (onCancel) {
      onCancel();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="border rounded-md p-4 text-center">
        <p className="text-sm text-muted-foreground mb-4">
          Please sign in to add a comment
        </p>
        <Button asChild size="sm">
          <a href="/auth/signin">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RichTextEditor
        content={content}
        onChange={setContent}
        placeholder={placeholder}
        editable={!isSubmitting}
      />

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting || !content.trim() || content === "<p></p>"}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            submitLabel
          )}
        </Button>
      </div>
    </form>
  );
}
