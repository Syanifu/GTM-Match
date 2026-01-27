import { Edit, MapPin, Calendar, Link as LinkIcon, Twitter, Linkedin, Briefcase, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import type { User } from "@/types/user";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile?: boolean;
}

export function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">
            {user.name.split(" ").map((n) => n[0]).join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
              <p className="text-muted-foreground">@{user.username}</p>
            </div>
            {isOwnProfile && (
              <Button asChild>
                <Link href="/profile/edit">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            )}
          </div>

          {user.bio && (
            <p className="text-sm">{user.bio}</p>
          )}

          {/* Professional Info */}
          {(user.jobRole || user.currentCompany) && (
            <div className="flex flex-wrap gap-4 text-sm">
              {user.jobRole && (
                <div className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  <span>{user.jobRole}</span>
                </div>
              )}
              {user.currentCompany && (
                <div className="flex items-center gap-1">
                  <Building2 className="h-4 w-4" />
                  <span>{user.currentCompany}</span>
                </div>
              )}
            </div>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Joined {formatDistanceToNow(user.joinedAt, { addSuffix: true })}</span>
            </div>
          </div>

          {/* Social Links */}
          {user.social && (
            <div className="flex flex-wrap gap-2">
              {user.social.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={user.social.website} target="_blank" rel="noopener noreferrer">
                    <LinkIcon className="mr-2 h-3 w-3" />
                    Website
                  </a>
                </Button>
              )}
              {user.social.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={`https://twitter.com/${user.social.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="mr-2 h-3 w-3" />
                    Twitter
                  </a>
                </Button>
              )}
              {user.social.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a href={user.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-3 w-3" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Badges */}
      {user.badges && user.badges.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Badges</h3>
          <div className="flex flex-wrap gap-2">
            {user.badges.map((badge) => (
              <Badge
                key={badge.id}
                variant="secondary"
                className="gap-1 cursor-help"
                title={badge.description}
              >
                <span>{badge.icon}</span>
                <span>{badge.name}</span>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Expertise */}
      {user.expertise && user.expertise.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {user.expertise.map((area) => (
              <Badge key={area} variant="outline">
                {area}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
