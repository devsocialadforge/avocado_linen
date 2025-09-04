"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface MiddleSectionProps {
  className?: string;
}

export default function MiddleSection({ className = "" }: MiddleSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search query:", searchQuery);
  };

  return (
    <div className={`flex-1 max-w-lg mx-auto ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 pr-4 font-sans text-sm text-foreground bg-background border border-border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 placeholder:text-muted-foreground"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors duration-200 font-sans text-xs font-medium"
        >
          Search
        </button>
      </form>
    </div>
  );
}
