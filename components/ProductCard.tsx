"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { urlFor } from "@/lib/sanity/client";
import { Product } from "@/types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

// Dummy data for rating and discounts - you'll replace this with backend data later
const getDummyRating = (productId: string) => {
  // Generate consistent dummy data based on product ID
  const hash = productId.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  const rating = 3.5 + (Math.abs(hash) % 15) / 10; // Rating between 3.5 and 5.0
  const reviewCount = 5 + (Math.abs(hash) % 95); // Review count between 5 and 100

  return {
    rating: Math.round(rating * 10) / 10,
    reviewCount,
  };
};

const getDummyDiscount = (productId: string) => {
  // Generate consistent dummy discount based on product ID
  const hash = productId.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);

  const discountPercentages = [5, 10, 15, 20, 25, 30];
  const flatDiscounts = ["FLAT15", "FLAT20", "FLAT25", "FLAT30"];

  const discountPercent =
    discountPercentages[Math.abs(hash) % discountPercentages.length];
  const flatDiscount = flatDiscounts[Math.abs(hash) % flatDiscounts.length];

  return {
    discountPercent,
    flatDiscount,
  };
};

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get dummy data
  const { rating, reviewCount } = getDummyRating(product._id);
  const { discountPercent, flatDiscount } = getDummyDiscount(product._id);

  // Calculate prices
  const originalPrice = product.price;
  const salePrice =
    product.salePrice || originalPrice * (1 - discountPercent / 100);

  // Check if product has a second image for hover effect
  const hasSecondImage = product.images && product.images.length > 1;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className={`group relative bg-white  overflow-hidden ${className}`}>
      <Link href={`/products/${product.slug.current}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
          {/* First Image (Default) */}
          <Image
            src={urlFor(product.images[0]).auto("format").quality(90).url()}
            alt={product.images[0].alt || product.title}
            fill
            className={`object-cover transition-transform duration-300 ${
              hasSecondImage
                ? "group-hover:opacity-0 group-hover:scale-105"
                : "group-hover:scale-105"
            }`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />

          {/* Second Image (Hover) - Only show if second image exists */}
          {hasSecondImage && (
            <Image
              src={urlFor(product.images[1]).auto("format").quality(90).url()}
              alt={product.images[1].alt || product.title}
              fill
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}

          {/* NEW IN Badge */}
          {product.newIn && (
            <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded z-10">
              NEW IN
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200 z-10"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            <Heart
              className={`w-4 h-4 ${
                isWishlisted
                  ? "fill-red-500 text-red-500"
                  : "text-gray-600 hover:text-red-500"
              } transition-colors duration-200`}
            />
          </button>

          {/* Rating */}
          {discountPercent > 0 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 z-10 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm">
              <div className="flex items-center">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium ml-1 text-gray-900">
                  {rating}
                </span>
              </div>
              <span className="text-xs text-gray-600">({reviewCount})</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="mt-1 space-y-1">
          {/* Product Title */}
          <h3 className="text-sm md:text-base font-medium text-gray-900 truncate leading-tight">
            {product.title}
          </h3>
          {/* Pricing */}

          <div className="flex items-center gap-2">
            <span className="text-sm md:text-lg  text-gray-900">
              ₹{Math.round(salePrice).toLocaleString()}
            </span>
            {salePrice < originalPrice && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <span className="inline-flex items-center text-xs font-medium text-primary bg-red-50 border ">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          {/* Flat Discount Info */}
          <div className="text-xs text-primary">
            <span className="font-normal md:font-medium">
              Now at ₹
              <span className="font-bold text-sm">
                {Math.round(salePrice - salePrice * 0.05).toLocaleString()}
              </span>
            </span>
            <span className="text-gray-600"> with </span>
            <span className=" text-xs font-bold ">{flatDiscount}</span>
          </div>

          {/* Stock Status */}
          {!product.stock && (
            <div className="text-xs text-red-500 font-medium">Out of Stock</div>
          )}
        </div>
      </Link>
    </div>
  );
}

// Export a grid container component for easy layout
export function ProductGrid({
  products,
  className = "",
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${className}`}
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
