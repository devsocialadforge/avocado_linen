"use client";

import { useState } from "react";
import { X, Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export interface FilterOptions {
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
}

interface FilterSheetProps {
  availableColors: string[];
  availableSizes: string[];
  minPrice: number;
  maxPrice: number;
  activeFilters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  filterCount: number;
}

export default function FilterSheet({
  availableColors,
  availableSizes,
  minPrice,
  maxPrice,
  activeFilters,
  onFiltersChange,
  filterCount,
}: FilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FilterOptions>(activeFilters);

  const handleColorToggle = (color: string) => {
    const newColors = tempFilters.colors.includes(color)
      ? tempFilters.colors.filter((c) => c !== color)
      : [...tempFilters.colors, color];

    setTempFilters({ ...tempFilters, colors: newColors });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = tempFilters.sizes.includes(size)
      ? tempFilters.sizes.filter((s) => s !== size)
      : [...tempFilters.sizes, size];

    setTempFilters({ ...tempFilters, sizes: newSizes });
  };

  const handlePriceChange = (value: number[]) => {
    setTempFilters({ ...tempFilters, priceRange: [value[0], value[1]] });
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    setIsOpen(false);
  };

  // Reset temp filters when sheet opens
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTempFilters(activeFilters);
    }
    setIsOpen(open);
  };

  const clearFilters = () => {
    const clearedFilters = {
      colors: [],
      sizes: [],
      priceRange: [minPrice, maxPrice] as [number, number],
    };
    setTempFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    setIsOpen(false);
  };

  const hasActiveFilters = filterCount > 0;

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 relative"
          aria-label={
            hasActiveFilters
              ? `Filter products (${filterCount} active filters)`
              : "Filter products"
          }
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          {hasActiveFilters && (
            <Badge
              variant="destructive"
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              aria-label={`${filterCount} active filters`}
            >
              {filterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto p-2">
        <SheetHeader className="pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>Filters</SheetTitle>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 transition-all duration-200 font-medium group"
              >
                <X className="h-4 w-4 mr-1 group-hover:rotate-90 transition-transform duration-200" />
                Clear all
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="space-y-6">
          <Accordion type="multiple" className="w-full">
            {/* Color Filter */}
            {availableColors.length > 0 && (
              <AccordionItem value="color">
                <AccordionTrigger className="text-base font-medium">
                  Color
                  {tempFilters.colors.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {tempFilters.colors.length}
                    </Badge>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {availableColors.map((color) => {
                      const isSelected = tempFilters.colors.includes(color);
                      return (
                        <Badge
                          key={color}
                          variant={isSelected ? "default" : "outline"}
                          className="cursor-pointer hover:bg-gray-100 capitalize"
                          onClick={() => handleColorToggle(color)}
                        >
                          {color}
                          {isSelected && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Size Filter */}
            {availableSizes.length > 0 && (
              <AccordionItem value="size">
                <AccordionTrigger className="text-base font-medium">
                  Size
                  {tempFilters.sizes.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {tempFilters.sizes.length}
                    </Badge>
                  )}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {availableSizes.map((size) => {
                      const isSelected = tempFilters.sizes.includes(size);
                      return (
                        <Badge
                          key={size}
                          variant={isSelected ? "default" : "outline"}
                          className="cursor-pointer hover:bg-gray-100 uppercase"
                          onClick={() => handleSizeToggle(size)}
                        >
                          {size}
                          {isSelected && <X className="ml-1 h-3 w-3" />}
                        </Badge>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )}

            {/* Price Filter */}
            <AccordionItem value="price">
              <AccordionTrigger className="text-base font-medium">
                Price Range
              </AccordionTrigger>
              <AccordionContent>
                <div className="pt-4 space-y-4">
                  <div className="px-3">
                    <Slider
                      value={tempFilters.priceRange}
                      onValueChange={handlePriceChange}
                      max={maxPrice}
                      min={minPrice}
                      step={100}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹{tempFilters.priceRange[0].toLocaleString()}</span>
                    <span>₹{tempFilters.priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Apply Filters Button */}
        <div className="sticky bottom-0 bg-white border-t pt-4 mt-6">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={applyFilters} className="flex-1" size="lg">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
