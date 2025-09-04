import LeftSection from "./Leftsection";
import MiddleSection from "./MiddileSection";
import RightSection from "./RightSection";
import { fetchActiveMenuItems } from "@/lib/sanity/fetch";

interface HeaderProps {
  className?: string;
}

export default async function Header({ className = "" }: HeaderProps) {
  const menuData = await fetchActiveMenuItems();
  return (
    <header
      className={`sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border ${className}`}
    >
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header */}
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          {/* Left Section - Brand & Navigation */}
          <LeftSection className=" md:flex-none gap-4" menuData={menuData} />

          {/* Middle Section - Search (hidden on mobile, shown on tablet+) */}
          <MiddleSection className="hidden sm:block flex-1 mx-8" />

          {/* Right Section - Icons */}
          <RightSection className="flex-shrink-0 ml-4" />
        </div>

        {/* Mobile Search Bar - Below main header on mobile */}
        <div className="sm:hidden pb-4 pt-2">
          <MiddleSection />
        </div>
      </div>
    </header>
  );
}
