"use client";

import { X } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FilterOptions } from "./FilterSheet";

interface FilterSidebarProps {
  availableColors: string[];
  availableSizes: string[];
  minPrice: number;
  maxPrice: number;
  activeFilters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export default function FilterSidebar({
  availableColors,
  availableSizes,
  minPrice,
  maxPrice,
  activeFilters,
  onFiltersChange,
}: FilterSidebarProps) {
  const handleColorToggle = (color: string) => {
    const newColors = activeFilters.colors.includes(color)
      ? activeFilters.colors.filter((c) => c !== color)
      : [...activeFilters.colors, color];

    onFiltersChange({ ...activeFilters, colors: newColors });
  };

  const handleSizeToggle = (size: string) => {
    const newSizes = activeFilters.sizes.includes(size)
      ? activeFilters.sizes.filter((s) => s !== size)
      : [...activeFilters.sizes, size];

    onFiltersChange({ ...activeFilters, sizes: newSizes });
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({ ...activeFilters, priceRange: [value[0], value[1]] });
  };

  const clearFilters = () => {
    onFiltersChange({
      colors: [],
      sizes: [],
      priceRange: [minPrice, maxPrice],
    });
  };

  const hasActiveFilters =
    activeFilters.colors.length > 0 ||
    activeFilters.sizes.length > 0 ||
    activeFilters.priceRange[0] !== minPrice ||
    activeFilters.priceRange[1] !== maxPrice;

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-600 hover:text-red-700"
          >
            Clear all
          </Button>
        )}
      </div>

      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["color", "size", "price"]}
      >
        {/* Color Filter */}
        {availableColors.length > 0 && (
          <AccordionItem value="color">
            <AccordionTrigger className="text-base font-medium">
              Color
              {activeFilters.colors.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilters.colors.length}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pt-2">
                {availableColors.map((color) => {
                  const isSelected = activeFilters.colors.includes(color);
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
              {activeFilters.sizes.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilters.sizes.length}
                </Badge>
              )}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap gap-2 pt-2">
                {availableSizes.map((size) => {
                  const isSelected = activeFilters.sizes.includes(size);
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
                  value={activeFilters.priceRange}
                  onValueChange={handlePriceChange}
                  max={maxPrice}
                  min={minPrice}
                  step={100}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{activeFilters.priceRange[0].toLocaleString()}</span>
                <span>₹{activeFilters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
