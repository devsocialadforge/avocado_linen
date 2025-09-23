"use client";

import { MessageCircle, User, RotateCcw, ShoppingCart } from "lucide-react";

interface RightSectionProps {
  className?: string;
}

export default function RightSection({ className = "" }: RightSectionProps) {
  const iconItems = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/your-number",
      badge: null,
    },
    {
      name: "Account",
      icon: User,
      href: "/account",
      badge: null,
    },
    {
      name: "Return Policy",
      icon: RotateCcw,
      href: "/returns",
      badge: null,
    },
    {
      name: "Cart",
      icon: ShoppingCart,
      href: "/cart",
      badge: "2",
    },
  ];

  return (
    <div className={`flex items-center ${className}`}>
      {/* Desktop Icons */}
      <div className="hidden lg:flex items-center space-x-4">
        {iconItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              className="relative p-2 text-foreground hover:text-accent transition-colors duration-200 group"
              title={item.name}
            >
              <IconComponent size={20} />
              {item.badge && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-sans font-medium rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs font-sans px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                {item.name}
              </span>
            </a>
          );
        })}
        {/* Wishlist Icon */}
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden relative">
        <ShoppingCart size={20} />
      </div>
    </div>
  );
}
