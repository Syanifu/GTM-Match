"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Plus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/auth-store";
import { useSearchStore } from "@/stores/search-store";
import { SearchModal } from "@/components/layout/search-modal";
import { NotificationPanel } from "@/components/layout/notification-panel";
import { toast } from "sonner";

export function Navbar() {
  const router = useRouter();
  const { user, isAuthenticated, signOut } = useAuthStore();
  const { setIsOpen } = useSearchStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    toast.success("Signed out successfully");
    router.push("/");
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <SearchModal />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-6">
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                      <span className="text-lg font-bold text-primary-foreground">GM</span>
                    </div>
                    <span className="text-xl font-bold">GTM Match</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                <Link
                  href="/problems"
                  onClick={closeMobileMenu}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Browse Problems
                </Link>
                <Link
                  href="/leaderboard"
                  onClick={closeMobileMenu}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Leaderboard
                </Link>
                <Link
                  href="/tools"
                  onClick={closeMobileMenu}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Tools
                </Link>
                <Link
                  href="/jobs"
                  onClick={closeMobileMenu}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Jobs
                </Link>
                <Link
                  href="/benchmarking"
                  onClick={closeMobileMenu}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Benchmarks
                </Link>
                <Link
                  href="/test"
                  onClick={closeMobileMenu}
                  className="text-lg font-medium hover:text-primary transition-colors"
                >
                  Test
                </Link>

                {isAuthenticated && (
                  <>
                    <Separator className="my-2" />
                    <Link
                      href="/problems/new"
                      onClick={closeMobileMenu}
                      className="text-lg font-medium text-primary hover:text-primary/90 transition-colors"
                    >
                      Post a Problem
                    </Link>
                    <Link
                      href={`/profile/${user?.username}`}
                      onClick={closeMobileMenu}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/profile/edit"
                      onClick={closeMobileMenu}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Settings
                    </Link>
                    <Separator className="my-2" />
                    <button
                      onClick={() => {
                        handleSignOut();
                        closeMobileMenu();
                      }}
                      className="text-lg font-medium hover:text-primary transition-colors text-left"
                    >
                      Sign Out
                    </button>
                  </>
                )}

                {!isAuthenticated && (
                  <>
                    <Separator className="my-2" />
                    <Link
                      href="/auth/signin"
                      onClick={closeMobileMenu}
                      className="text-lg font-medium hover:text-primary transition-colors"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      onClick={closeMobileMenu}
                      className="text-lg font-medium text-primary hover:text-primary/90 transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">GM</span>
            </div>
            <span className="text-xl font-bold hidden xs:inline sm:inline">GTM Match</span>
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" asChild>
              <Link href="/problems">Browse Problems</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/leaderboard">Leaderboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/tools">Tools</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/jobs">Jobs</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/benchmarking">Benchmarks</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/test">Test</Link>
            </Button>
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search */}
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} className="h-9 w-9">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {isAuthenticated ? (
            <>
              {/* Post Problem Button - Icon only on mobile, full on desktop */}
              <Button asChild size="icon" className="h-9 w-9 sm:hidden">
                <Link href="/problems/new">
                  <Plus className="h-5 w-5" />
                  <span className="sr-only">Post a Problem</span>
                </Link>
              </Button>
              <Button asChild className="hidden sm:inline-flex">
                <Link href="/problems/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Post a Problem
                </Link>
              </Button>

              {/* Notifications */}
              <NotificationPanel />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/profile/${user?.username}`}>My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile/edit">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Hide auth buttons on mobile - available in hamburger menu */}
              <Button variant="ghost" asChild className="hidden sm:inline-flex">
                <Link href="/auth/signin">Sign In</Link>
              </Button>
              <Button asChild className="hidden sm:inline-flex">
                <Link href="/auth/signup">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
    </>
  );
}
