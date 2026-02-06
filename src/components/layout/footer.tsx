import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 sm:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/problems" className="hover:text-foreground transition-colors">
                  Browse Problems
                </Link>
              </li>
              <li>
                <Link href="/problems/new" className="hover:text-foreground transition-colors">
                  Post a Problem
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-foreground transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-foreground transition-colors">
                  Tools Directory
                </Link>
              </li>
              <li>
                <Link href="/test" className="hover:text-foreground transition-colors">
                  GTM Challenges
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/guidelines" className="hover:text-foreground transition-colors">
                  Community Guidelines
                </Link>
              </li>
              <li>
                <Link href="/benchmarking" className="hover:text-foreground transition-colors">
                  Benchmarks
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold mb-4">Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Join our community of B2B SaaS operators
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <span className="text-xs font-bold text-primary-foreground">GM</span>
            </div>
            <span>© 2025 GTM Match. All rights reserved.</span>
          </div>
          <p>Built for B2B SaaS operators, by B2B SaaS operators.</p>
        </div>
      </div>
    </footer>
  );
}
