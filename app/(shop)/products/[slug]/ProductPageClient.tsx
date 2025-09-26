"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ProductDocument, SanityImage, ProductColor, ProductSize } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Star,
  ShoppingCart,
  Zap,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { urlFor } from "@/lib/sanity/client";

interface ProductPageClientProps {
  product: ProductDocument;
}

// Product Gallery Component
function ProductGallery({ images, title }: { images: SanityImage[]; title: string }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const mainImageRef = useRef<HTMLDivElement>(null);

  if (!images?.length) {
    return (
      <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    );
  }

  // Function to scroll to specific image in the main container
  const scrollToImage = (index: number) => {
    setSelectedImage(index);
    if (mainImageRef.current) {
      const imageElement = mainImageRef.current.children[index] as HTMLElement;
      if (imageElement) {
        imageElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Gallery */}
      <div className="hidden md:flex gap-4 h-screen">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3 h-full overflow-y-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => scrollToImage(index)}
                className={cn(
                  "relative aspect-square w-24 h-24 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 flex-shrink-0",
                  selectedImage === index
                    ? "border-primary shadow-md ring-2 ring-primary/20"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <Image
                  src={urlFor(image.asset).width(96).height(96).url()}
                  alt={image.alt || `${title} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main Images Container - Scrollable */}
        <div className="flex-1 relative scrollbar-hide">
          <div
            ref={mainImageRef}
            className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-track]:hidden space-y-4 pr-2 sticky-container"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-full rounded-xl overflow-hidden bg-gray-50 scrollbar-hide group shadow-lg flex-shrink-0"
              >
                <Image
                  src={urlFor(image.asset).width(1200).height(1600).url()}
                  alt={image.alt || `${title} image ${index + 1}`}
                  fill
                  className="object-contain "
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50">
                  <Image
                    src={`${image.asset?.url}?w=400&h=400&fit=crop`}
                    alt={image.alt || `${title} image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>

        {/* Mobile Image Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {images.map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === selectedImage ? "bg-primary" : "bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Rating Component
function ProductRating({
  rating = 4.5,
  reviewCount = 128,
}: {
  rating?: number;
  reviewCount?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-5 h-5 transition-colors",
              i < Math.floor(rating)
                ? "fill-yellow-400 text-yellow-400"
                : i < rating
                  ? "fill-yellow-400/50 text-yellow-400"
                  : "text-gray-300"
            )}
          />
        ))}
      </div>
      <span className="text-lg font-semibold text-gray-900">{rating}</span>
      <span className="text-sm text-gray-600 hover:text-primary cursor-pointer transition-colors">
        ({reviewCount.toLocaleString()} reviews)
      </span>
    </div>
  );
}

// Price Component
function ProductPrice({
  price,
  salePrice,
  discountPercentage,
}: {
  price: number;
  salePrice?: number;
  discountPercentage?: number;
}) {
  const hasDiscount = salePrice && salePrice < price;
  const finalDiscount =
    discountPercentage ||
    (hasDiscount ? Math.round(((price - salePrice) / price) * 100) : 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-3xl lg:text-4xl font-bold text-gray-900">
          ₹{hasDiscount ? salePrice.toLocaleString() : price.toLocaleString()}
        </span>
        {hasDiscount && (
          <>
            <span className="text-xl text-gray-500 line-through">
              ₹{price.toLocaleString()}
            </span>
            <Badge
              variant="destructive"
              className="text-sm font-semibold px-3 py-1"
            >
              {finalDiscount}% OFF
            </Badge>
          </>
        )}
      </div>
      {hasDiscount && (
        <p className="text-sm text-green-600 font-medium">
          You save ₹{(price - salePrice).toLocaleString()}
        </p>
      )}
    </div>
  );
}

// Color Selector Component
function ColorSelector({
  colors,
  selectedColor,
  onColorChange,
}: {
  colors: ProductColor[];
  selectedColor: string;
  onColorChange: (color: string) => void;
}) {
  if (!colors?.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">
        Color: <span className="font-normal">{selectedColor}</span>
      </h3>
      <div className="flex gap-3">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => onColorChange(color.name)}
            className={cn(
              "w-10 h-10 rounded-full border-2 transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
              selectedColor === color.name
                ? "border-gray-900 scale-110 shadow-lg"
                : "border-gray-300 hover:border-gray-400"
            )}
            style={{ backgroundColor: color.name.toLowerCase() }}
            title={color.name}
          >
            {selectedColor === color.name && (
              <div className="w-full h-full rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// Size Selector Component
function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
}: {
  sizes: ProductSize[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}) {
  if (!sizes?.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-gray-900">
        Size: <span className="font-normal">{selectedSize}</span>
      </h3>
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => onSizeChange(size.size)}
            disabled={!size.active}
            className={cn(
              "px-6 py-3 border-2 rounded-lg font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
              selectedSize === size.size
                ? "border-gray-900 bg-gray-900 text-white shadow-md"
                : size.active
                  ? "border-gray-300 hover:border-gray-500 hover:bg-gray-50"
                  : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50 opacity-50"
            )}
          >
            {size.size}
          </button>
        ))}
      </div>
    </div>
  );
}

// Offer Box Component
function OfferBox() {
  const offers = [
    { icon: Truck, text: "Free shipping on orders above ₹999" },
    { icon: RotateCcw, text: "Easy returns within 30 days" },
    { icon: Shield, text: "100% authentic products" },
  ];

  return (
    <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-green-600" />
          <span className="font-semibold text-green-800">Special Offers</span>
        </div>
        <div className="space-y-2">
          {offers.map((offer, index) => (
            <div key={index} className="flex items-center gap-2">
              <offer.icon className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">{offer.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// CTA Buttons Component
function CTAButtons({
  onAddToCart,
  onBuyNow,
  inStock,
}: {
  onAddToCart: () => void;
  onBuyNow: () => void;
  inStock: boolean;
}) {
  return (
    <div className="flex gap-3">
      <Button
        onClick={onAddToCart}
        disabled={!inStock}
        className="flex-1 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        {inStock ? "Add to Cart" : "Out of Stock"}
      </Button>
      <Button
        onClick={onBuyNow}
        disabled={!inStock}
        variant="outline"
        className="flex-1 h-14 text-base font-semibold border-2 hover:bg-primary hover:text-white transition-all"
      >
        <Zap className="w-5 h-5 mr-2" />
        Buy Now
      </Button>
    </div>
  );
}

// Product Info Banner Component
function ProductInfoBanner() {
  return (
    <Card className="mt-12 overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="relative h-40 md:h-48 bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100">
          <div className="absolute inset-0 flex items-center justify-between px-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                Best Fits for Indian Women
              </h3>
              <p className="text-gray-700 text-lg max-w-md">
                Designed specifically for comfort, style, and the perfect fit
              </p>
            </div>
            <div className="hidden md:block relative w-32 h-32 ml-6">
              <div className="w-full h-full bg-white rounded-full shadow-xl flex items-center justify-center">
                <span className="text-4xl">👗</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.color?.[0]?.name || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.size?.find((s) => s.active)?.size || ""
  );

  const handleAddToCart = () => {
    console.log("Adding to cart:", {
      product: product._id,
      color: selectedColor,
      size: selectedSize,
    });
    // Add your cart logic here
  };

  const handleBuyNow = () => {
    console.log("Buy now:", {
      product: product._id,
      color: selectedColor,
      size: selectedSize,
    });
    // Add your buy now logic here
  };

  return (
    <div className="min-h-screen bg-white">
      <div className=" mx-auto px-4  py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Section - Product Gallery */}
          <div className="order-1">
            <ProductGallery
              images={product.images || []}
              title={product.title}
            />
          </div>

          {/* Right Section - Product Info */}
          <div className="order-2 space-y-8">
            {/* Product Title & Rating */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.title}
              </h1>
              <ProductRating />
            </div>

            {/* Price */}
            <ProductPrice
              price={product.price}
              salePrice={product.salePrice}
              discountPercentage={product.discountPercentage}
            />

            {/* Offer Box */}
            <OfferBox />

            {/* Color Selection */}
            {product.color && product.color.length > 0 && (
              <ColorSelector
                colors={product.color}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
              />
            )}

            {/* Size Selection */}
            {product.size && product.size.length > 0 && (
              <SizeSelector
                sizes={product.size}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
              />
            )}

            {/* CTA Buttons & Actions */}
            <div className="flex w-full items-center justify-center gap-4">
              <div className="flex-1">
                <CTAButtons
                  onAddToCart={handleAddToCart}
                  onBuyNow={handleBuyNow}
                  inStock={product.stock}
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-8 space-y-3">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">SKU:</span>
                  <span className="ml-2 text-gray-600 font-mono">
                    {product._id.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Availability:
                  </span>
                  <span
                    className={cn(
                      "ml-2 font-medium",
                      product.stock ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {product.stock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                <strong>Note:</strong> Inclusive of all taxes. Free shipping on
                orders above ₹999. Easy returns within 30 days.
              </p>
            </div>

            {/* Product Description */}
            {product.description && (
              <div className="border-t border-gray-200 pt-8">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                  Product Description
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {product.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section - Info Banner */}
        <ProductInfoBanner />
      </div>
    </div>
  );
}
