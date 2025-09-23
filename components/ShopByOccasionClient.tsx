"use client";

import { useState } from "react";
import Link from "next/link";
import { OccasionShoppingDocument, Product } from "@/types";
import ProductCard from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type OccasionTab = "formal" | "casual" | "going-out";

interface TabConfig {
  key: OccasionTab;
  label: string;
  displayLabel: string;
  collectionUrl: string;
}

const tabs: TabConfig[] = [
  {
    key: "formal",
    label: "FORMALS",
    displayLabel: "Formals",
    collectionUrl: "/collections/formal-wear",
  },
  {
    key: "casual",
    label: "CASUALS",
    displayLabel: "Casuals",
    collectionUrl: "/collections/casual-wear",
  },
  {
    key: "going-out",
    label: "GOING OUT",
    displayLabel: "Going Out",
    collectionUrl: "/collections/evening-wear",
  },
];

interface ShopByOccasionClientProps {
  initialData: {
    formal: OccasionShoppingDocument[];
    casual: OccasionShoppingDocument[];
    "going-out": OccasionShoppingDocument[];
  };
}

export default function ShopByOccasionClient({
  initialData,
}: ShopByOccasionClientProps) {
  const [activeTab, setActiveTab] = useState<OccasionTab>("casual");
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  const handleTabClick = (tab: OccasionTab) => {
    if (tab !== activeTab && !isAnimating) {
      setIsAnimating(true);
      setActiveTab(tab);
      setContentKey((prev) => prev + 1);

      // Reset animation state after all animations complete
      setTimeout(() => {
        setIsAnimating(false);
      }, 800);
    }
  };

  // Get products from the current active tab
  const currentOccasionData = initialData[activeTab];
  const currentProducts = currentOccasionData.reduce<Product[]>(
    (allProducts, occasionDoc) => {
      return [...allProducts, ...occasionDoc.products];
    },
    []
  );

  return (
    <div className="w-full mx-auto px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 animate-smooth-dive-in">
          Shop by Occasion
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex border-b border-gray-200">
            {tabs.map((tab, index) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`px-6 py-3 text-sm font-medium transition-all duration-500 ease-out relative transform hover:scale-105 active:scale-95 animate-tab-appear ${
                  activeTab === tab.key
                    ? "text-gray-900 border-b-2 border-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg"
                } ${isAnimating ? "pointer-events-none" : ""}`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 animate-smooth-slide-in" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-hidden">
        {currentProducts.length > 0 ? (
          <div
            key={contentKey}
            className="space-y-4 animate-content-dive-smooth"
          >
            {/* Products Carousel */}
            <div className="relative md:px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: false,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 md:-ml-4">
                  {currentProducts.map((product, index) => (
                    <CarouselItem
                      key={product._id}
                      className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5 animate-product-dive-smooth"
                      style={{
                        animationDelay: `${index * 80 + 200}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div className="transform transition-all duration-400 ease-out hover:scale-105 hover:shadow-xl hover:-translate-y-2 hover:rotate-1">
                        <ProductCard product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  className="transition-all duration-400 hover:scale-110 hover:shadow-lg animate-control-appear"
                  style={{ animationDelay: "100ms", animationFillMode: "both" }}
                />
                <CarouselNext
                  className="transition-all duration-400 hover:scale-110 hover:shadow-lg animate-control-appear"
                  style={{ animationDelay: "150ms", animationFillMode: "both" }}
                />
              </Carousel>
            </div>

            {/* View More Button */}
            <div className="text-center mt-8">
              <Link
                href={
                  tabs.find((t) => t.key === activeTab)?.collectionUrl || "/"
                }
              >
                <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-all duration-400 transform hover:scale-105 hover:shadow-xl active:scale-95 hover:-translate-y-1 animate-button-dive-smooth">
                  View More{" "}
                  {tabs.find((t) => t.key === activeTab)?.displayLabel}
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div
            key={contentKey}
            className="text-center py-12 animate-content-dive-smooth"
          >
            <div className="text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-4 animate-empty-icon-smooth"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-4m-4 0H8m-4 0h4m0 0v-3a2 2 0 012-2h2a2 2 0 012 2v3"
                />
              </svg>
              <p className="text-lg animate-empty-text-smooth">
                No products found for{" "}
                {tabs.find((t) => t.key === activeTab)?.displayLabel}
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes smooth-dive-in {
          0% {
            opacity: 0;
            transform: translateY(-40px) scale(0.95);
          }
          60% {
            opacity: 0.8;
            transform: translateY(8px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes content-dive-smooth {
          0% {
            opacity: 0;
            transform: translateY(-25px) scale(0.98);
          }
          50% {
            opacity: 0.7;
            transform: translateY(4px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes product-dive-smooth {
          0% {
            opacity: 0;
            transform: translateY(-35px) scale(0.9) rotateX(15deg);
          }
          40% {
            opacity: 0.6;
            transform: translateY(8px) scale(1.03) rotateX(-3deg);
          }
          70% {
            opacity: 0.9;
            transform: translateY(-2px) scale(1.01) rotateX(1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
          }
        }

        @keyframes button-dive-smooth {
          0% {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          70% {
            opacity: 0.8;
            transform: translateY(3px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes tab-appear {
          0% {
            opacity: 0;
            transform: translateY(-15px) scale(0.95);
          }
          80% {
            opacity: 0.9;
            transform: translateY(2px) scale(1.01);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes control-appear {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-10deg);
          }
          70% {
            opacity: 0.8;
            transform: scale(1.05) rotate(2deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes empty-icon-smooth {
          0% {
            opacity: 0;
            transform: translateY(-25px) scale(0.8) rotate(-5deg);
          }
          50% {
            opacity: 0.7;
            transform: translateY(8px) scale(1.1) rotate(2deg);
          }
          70% {
            transform: translateY(-3px) scale(0.98) rotate(-1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1) rotate(0deg);
          }
        }

        @keyframes empty-text-smooth {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes smooth-slide-in {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          60% {
            transform: scaleX(1.1);
          }
          100% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        .animate-smooth-dive-in {
          animation: smooth-dive-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-content-dive-smooth {
          animation: content-dive-smooth 0.6s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s both;
        }

        .animate-product-dive-smooth {
          animation: product-dive-smooth 0.7s
            cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-button-dive-smooth {
          animation: button-dive-smooth 0.6s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s both;
        }

        .animate-tab-appear {
          animation: tab-appear 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-control-appear {
          animation: control-appear 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .animate-empty-icon-smooth {
          animation: empty-icon-smooth 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)
            0.2s both;
        }

        .animate-empty-text-smooth {
          animation: empty-text-smooth 0.5s ease-out 0.5s both;
        }

        .animate-smooth-slide-in {
          animation: smooth-slide-in 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
}
