"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { MenuDocument } from "@/types";

interface LeftSectionProps {
  className?: string;
  menuData?: MenuDocument | null;
}

export default function LeftSection({
  className = "",
  menuData,
}: LeftSectionProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(
    null
  );

  // Use provided menuData or fall back to dummy data
  const currentMenuData = menuData;
  const navigationItems = currentMenuData?.menuItems || [];

  const getNavigationLink = (item: any) => {
    // If it has collections, use the first collection's slug
    if (
      item.collections &&
      item.collections.length > 0 &&
      item.collections[0]?.slug?.current
    ) {
      return `/collections/${item.collections[0].slug.current}`;
    }
    // If it has a direct link, use that
    if (item.link) {
      return item.link;
    }
    // Default fallback
    return "/";
  };

  // Show loading state if no menu data
  if (!currentMenuData) {
    return (
      <div className={`flex items-center space-x-4 ${className}`}>
        <div className="flex-shrink-0">
          <Link href="/">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary hover:text-primary/80 transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105 hover:drop-shadow-lg">
              Avocado Linen
            </h1>
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-8 ml-8">
          <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
          <div className="animate-pulse bg-gray-200 h-4 w-16 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden p-2 text-foreground hover:text-primary transition-all duration-300 ease-in-out transform hover:scale-110 active:scale-95 rounded-lg hover:bg-accent/10"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <div className="relative">
          <Menu
            size={24}
            className={`absolute transition-all duration-300 ease-in-out ${
              isMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
          <X
            size={24}
            className={`transition-all duration-300 ease-in-out ${
              isMenuOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
            }`}
          />
        </div>
      </button>

      {/* Brand Name */}
      <div className="flex-shrink-0">
        <Link href="/">
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-primary hover:text-primary/80 transition-all duration-300 ease-in-out cursor-pointer transform hover:scale-105 hover:drop-shadow-lg">
            Avocado Linen
          </h1>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center space-x-8 ml-8">
        {navigationItems.map((item, index) => (
          <div
            key={item.order || index}
            className="relative group"
            onMouseEnter={() =>
              item.collections && setActiveDropdown(item.label)
            }
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href={getNavigationLink(item)}
              className="font-sans text-base font-semibold text-foreground hover:text-primary transition-colors duration-200 py-2"
            >
              {item.label}
            </Link>

            {/* Simple Dropdown Menu - matches your image */}
            {item.collections && item.collections.length > 0 && (
              <div
                className={`absolute top-full right-0 mt-2 w-48 bg-white shadow-lg border border-gray-200 rounded-sm z-50 transition-all duration-200 ${
                  activeDropdown === item.label
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
              >
                <div className="py-2">
                  {item.collections.map((collection) => (
                    <Link
                      key={collection._id}
                      href={`/collections/${collection?.slug.current}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {collection.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Mobile Navigation Dropdown */}
      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50 lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-4 invisible"
        }`}
      >
        <nav className="flex flex-col py-2">
          {navigationItems.map((item, index) => (
            <div key={item.order || index}>
              {/* Main Menu Item */}
              {item.collections && item.collections.length > 0 ? (
                // Items with collections - clickable to expand
                <button
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-b border-gray-100 flex items-center justify-between"
                  onClick={() =>
                    setExpandedMobileItem(
                      expandedMobileItem === item.label ? null : item.label
                    )
                  }
                >
                  <span>{item.label}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedMobileItem === item.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              ) : (
                // Items without collections - direct link
                <Link
                  href={getNavigationLink(item)}
                  className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-b border-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )}

              {/* Mobile Collections Submenu - Expandable */}
              {item.collections && item.collections.length > 0 && (
                <div
                  className={`bg-gray-50 border-b border-gray-100 overflow-hidden transition-all duration-300 ease-in-out ${
                    expandedMobileItem === item.label
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="py-1">
                    {item.collections.map((collection) => (
                      <Link
                        key={collection._id}
                        href={`/collections/${collection.slug.current}`}
                        className="block px-8 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-150"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setExpandedMobileItem(null);
                        }}
                      >
                        {collection.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
