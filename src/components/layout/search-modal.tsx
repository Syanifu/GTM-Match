"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search, Hash, FileText, User, Wrench, Clock, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSearchStore } from "@/stores/search-store";
import { mockProblems } from "@/lib/mock-data/problems";
import { mockSolutions } from "@/lib/mock-data/solutions";
import { mockUsers } from "@/lib/mock-data/users";
import { mockTools } from "@/lib/mock-data/tools";

export function SearchModal() {
  const router = useRouter();
  const { isOpen, setIsOpen, query, setQuery, recentSearches, addRecentSearch, clearRecentSearches } = useSearchStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Global keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  // Filter results based on query
  const filteredProblems = query
    ? mockProblems.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()) ||
          p.category.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredSolutions = query
    ? mockSolutions.filter(
        (s) =>
          s.title.toLowerCase().includes(query.toLowerCase()) ||
          s.description.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredUsers = query
    ? mockUsers.filter(
        (u) =>
          u.name.toLowerCase().includes(query.toLowerCase()) ||
          u.username.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const filteredTools = query
    ? mockTools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase()) ||
          t.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  const handleSelect = useCallback(
    (callback: () => void) => {
      if (query.trim()) {
        addRecentSearch(query);
      }
      setIsOpen(false);
      setQuery("");
      callback();
    },
    [query, addRecentSearch, setIsOpen, setQuery]
  );

  if (!mounted) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-0 gap-0">
        <Command className="rounded-lg border-none shadow-none">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search problems, solutions, users, tools..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 hover:bg-accent rounded"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
              No results found.
            </Command.Empty>

            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <Command.Group heading="Recent searches">
                {recentSearches.map((search) => (
                  <Command.Item
                    key={search}
                    value={search}
                    onSelect={() => setQuery(search)}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-sm cursor-pointer hover:bg-accent"
                  >
                    <Clock className="h-4 w-4" />
                    <span>{search}</span>
                  </Command.Item>
                ))}
                <button
                  onClick={clearRecentSearches}
                  className="w-full text-xs text-muted-foreground hover:text-foreground mt-1 px-2 py-1 text-left"
                >
                  Clear recent searches
                </button>
              </Command.Group>
            )}

            {/* Problems */}
            {filteredProblems.length > 0 && (
              <Command.Group heading="Problems">
                {filteredProblems.map((problem) => (
                  <Command.Item
                    key={problem.id}
                    value={problem.title}
                    onSelect={() =>
                      handleSelect(() => router.push(`/problems/${problem.id}`))
                    }
                    className="flex items-start gap-3 px-2 py-2 rounded-sm cursor-pointer hover:bg-accent"
                  >
                    <Hash className="h-4 w-4 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{problem.title}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {problem.category.name} • {problem.metrics.solutionsCount} solutions
                      </div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Solutions */}
            {filteredSolutions.length > 0 && (
              <Command.Group heading="Solutions">
                {filteredSolutions.map((solution) => (
                  <Command.Item
                    key={solution.id}
                    value={solution.title}
                    onSelect={() =>
                      handleSelect(() => router.push(`/problems/${solution.problemId}#solution-${solution.id}`))
                    }
                    className="flex items-start gap-3 px-2 py-2 rounded-sm cursor-pointer hover:bg-accent"
                  >
                    <FileText className="h-4 w-4 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{solution.title}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        By {solution.author.name} • {solution.upvotes} upvotes
                      </div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Users */}
            {filteredUsers.length > 0 && (
              <Command.Group heading="Users">
                {filteredUsers.map((user) => (
                  <Command.Item
                    key={user.id}
                    value={user.name}
                    onSelect={() =>
                      handleSelect(() => router.push(`/profile/${user.username}`))
                    }
                    className="flex items-center gap-3 px-2 py-2 rounded-sm cursor-pointer hover:bg-accent"
                  >
                    <User className="h-4 w-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{user.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        @{user.username} • {user.reputation} reputation
                      </div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Tools */}
            {filteredTools.length > 0 && (
              <Command.Group heading="Tools">
                {filteredTools.map((tool) => (
                  <Command.Item
                    key={tool.id}
                    value={tool.name}
                    onSelect={() =>
                      handleSelect(() => router.push(`/tools/${tool.slug}`))
                    }
                    className="flex items-center gap-3 px-2 py-2 rounded-sm cursor-pointer hover:bg-accent"
                  >
                    <Wrench className="h-4 w-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{tool.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {tool.category} • {tool.pricing}
                      </div>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>
          <div className="border-t px-3 py-2 text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 bg-muted rounded">⌘K</kbd> to open,{" "}
            <kbd className="px-1.5 py-0.5 bg-muted rounded">↑↓</kbd> to navigate,{" "}
            <kbd className="px-1.5 py-0.5 bg-muted rounded">↵</kbd> to select,{" "}
            <kbd className="px-1.5 py-0.5 bg-muted rounded">esc</kbd> to close
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
