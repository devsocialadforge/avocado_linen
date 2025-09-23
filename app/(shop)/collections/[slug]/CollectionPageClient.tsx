"use client";

import { useState, useMemo, useEffect } from "react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import FilterSheet, {
  FilterOptions,
} from "@/components/collection/FilterSheet";
import FilterSidebar from "@/components/collection/FilterSidebar";
import SortSelect, { SortOption } from "@/components/collection/SortSelect";
import { Button } from "@/components/ui/button";

interface CollectionPageClientProps {
  products: Product[];
  collectionName: string;
  collectionSlug: string;
}

export default function CollectionPageClient({
  products,
  collectionName,
}: CollectionPageClientProps) {
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [filters, setFilters] = useState<FilterOptions>({
    colors: [],
    sizes: [],
    priceRange: [0, 10000],
  });

  // Extract available filter options from products
  const { availableColors, availableSizes, minPrice, maxPrice } =
    useMemo(() => {
      const colors = new Set<string>();
      const sizes = new Set<string>();
      let min = Infinity;
      let max = 0;

      products.forEach((product) => {
        // Add colors
        product.color?.forEach((color) => {
          if (color.name) colors.add(color.name.toLowerCase());
        });

        // Add sizes
        product.size?.forEach((size) => {
          if (size.active && size.size) sizes.add(size.size);
        });

        // Calculate price range
        const price = product.salePrice || product.price;
        if (price < min) min = price;
        if (price > max) max = price;
      });

      return {
        availableColors: Array.from(colors).sort(),
        availableSizes: Array.from(sizes).sort(),
        minPrice: min === Infinity ? 0 : Math.floor(min / 100) * 100,
        maxPrice: Math.ceil(max / 100) * 100,
      };
    }, [products]);

  // Initialize price range filter
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
    }));
  }, [minPrice, maxPrice]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Color filter
      if (filters.colors.length > 0) {
        const productColors =
          product.color?.map((c) => c.name?.toLowerCase()) || [];
        if (!filters.colors.some((color) => productColors.includes(color))) {
          return false;
        }
      }

      // Size filter
      if (filters.sizes.length > 0) {
        const productSizes =
          product.size?.filter((s) => s.active).map((s) => s.size) || [];
        if (!filters.sizes.some((size) => productSizes.includes(size))) {
          return false;
        }
      }

      // Price filter
      const price = product.salePrice || product.price;
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return (
            new Date(b._updatedAt || b._createdAt).getTime() -
            new Date(a._updatedAt || a._createdAt).getTime()
          );
        case "price-low-high":
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case "price-high-low":
          return (b.salePrice || b.price) - (a.salePrice || a.price);
        case "name-a-z":
          return a.title.localeCompare(b.title);
        case "name-z-a":
          return b.title.localeCompare(a.title);
        case "featured":
        default:
          // Featured: prioritize newIn, then by priority, then by creation date
          if (a.newIn !== b.newIn) return b.newIn ? 1 : -1;
          if (a.priority !== b.priority) return b.priority - a.priority;
          return (
            new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()
          );
      }
    });

    return filtered;
  }, [products, filters, sortOption]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.colors.length > 0) count += filters.colors.length;
    if (filters.sizes.length > 0) count += filters.sizes.length;
    if (
      filters.priceRange[0] !== minPrice ||
      filters.priceRange[1] !== maxPrice
    )
      count += 1;
    return count;
  }, [filters, minPrice, maxPrice]);

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header - Sticky */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2 justify-between">
          <SortSelect
            value={sortOption}
            onValueChange={setSortOption}
            className="w-[140px]"
          />
          <FilterSheet
            availableColors={availableColors}
            availableSizes={availableSizes}
            minPrice={minPrice}
            maxPrice={maxPrice}
            activeFilters={filters}
            onFiltersChange={setFilters}
            filterCount={activeFilterCount}
          />
        </div>
        <div className="mt-2">
          <h1 className="text-base text-center capitalize font-semibold truncate">
            {collectionName}
          </h1>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Left Sidebar - Desktop */}
        <div className="sticky top-0 h-screen">
          <FilterSidebar
            availableColors={availableColors}
            availableSizes={availableSizes}
            minPrice={minPrice}
            maxPrice={maxPrice}
            activeFilters={filters}
            onFiltersChange={setFilters}
          />
        </div>

        {/* Main Content - Desktop */}
        <div className="flex-1 p-6">
          {/* Desktop Header */}
          <div className="flex items-center w-full justify-center gap-4">
            <h1 className="md:text-xl text-base capitalize sm:text-lg font-bold">
              {collectionName}
            </h1>
          </div>
          <div className="flex items-center justify-end gap-4 mb-6">
            <span className="text-sm text-gray-600">
              {filteredAndSortedProducts.length} products
            </span>
            <SortSelect value={sortOption} onValueChange={setSortOption} />
          </div>

          {/* Products Grid - Desktop */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to see more products.
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    colors: [],
                    sizes: [],
                    priceRange: [minPrice, maxPrice],
                  })
                }
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Content */}
      <div className="lg:hidden">
        {/* Mobile Products Count */}
        <div className="px-4 py-3 bg-white border-b border-gray-100">
          <p className="text-sm text-gray-600">
            {filteredAndSortedProducts.length} products
          </p>
        </div>

        {/* Mobile Products Grid */}
        <div className="">
          {filteredAndSortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters to see more products.
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    colors: [],
                    sizes: [],
                    priceRange: [minPrice, maxPrice],
                  })
                }
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
