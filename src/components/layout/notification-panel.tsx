"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  MessageSquare,
  ThumbsUp,
  Award,
  CheckCheck,
  X,
  Settings,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useNotificationStore } from "@/stores/notification-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "comment":
      return MessageSquare;
    case "upvote":
      return ThumbsUp;
    case "solution_accepted":
    case "badge_earned":
      return Award;
    default:
      return Bell;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case "comment":
      return "text-blue-500";
    case "upvote":
      return "text-green-500";
    case "solution_accepted":
      return "text-purple-500";
    case "badge_earned":
      return "text-yellow-500";
    default:
      return "text-muted-foreground";
  }
};

export function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } =
    useNotificationStore();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Notifications</SheetTitle>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs"
                >
                  <CheckCheck className="h-4 w-4 mr-1" />
                  Mark all read
                </Button>
              )}
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </SheetHeader>
        <Separator className="my-4" />
        <ScrollArea className="h-[calc(100vh-120px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No notifications yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                We'll notify you when something happens
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type);
                const iconColor = getNotificationColor(notification.type);

                return (
                  <div key={notification.id}>
                    <Link
                      href={notification.link}
                      onClick={() => {
                        handleNotificationClick(notification.id);
                        setOpen(false);
                      }}
                      className={`block p-3 rounded-lg hover:bg-accent transition-colors ${
                        !notification.read ? "bg-accent/50" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={notification.actor.avatar} />
                            <AvatarFallback>
                              {notification.actor.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-background flex items-center justify-center border-2 border-background ${iconColor}`}
                          >
                            <Icon className="h-3 w-3" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm">
                              <span className="font-medium">
                                {notification.actor.name}
                              </span>{" "}
                              <span className="text-muted-foreground">
                                {notification.message}
                              </span>
                            </p>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                deleteNotification(notification.id);
                              }}
                              className="p-1 hover:bg-accent rounded"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(notification.timestamp), {
                                addSuffix: true,
                              })}
                            </p>
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
