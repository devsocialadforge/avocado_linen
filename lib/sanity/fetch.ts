import { client } from "./client";
import {
  PRODUCTS_QUERY,
  FEATURED_PRODUCTS_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCTS_BY_COLLECTION_SLUG_QUERY,
  ALL_PRODUCTS_QUERY,
  ACTIVE_MENU_ITEMS_QUERY,
  ALL_COLLECTIONS_QUERY,
  ALL_CATEGORY_ICONS_QUERY,
  ALL_CATEGORY_HIGHLIGHTS_QUERY,
  ALL_MAIN_BANNERS_QUERY,
  OCCASION_PRODUCTS_QUERY,
  SECOND_BANNER_QUERY,
  ALL_COLLECTION_HIGHLIGHTS_QUERY,
} from "./querys";
import {
  ProductDocument,
  MenuDocument,
  CollectionDocument,
  CategoryIconsDocument,
  OccasionShoppingDocument,
  MainBannerDocument,
  SecondBannerDocument,
  CategoryHighlightsDocument,
  CollectionHighlightsQueryResult,
} from "@/types";

// Fetch all products with full details
export async function fetchProducts(): Promise<ProductDocument[]> {
  const products = await client.fetch<ProductDocument[]>(PRODUCTS_QUERY, {});
  return products;
}

// Fetch featured products (new in products)
export async function fetchFeaturedProducts(): Promise<ProductDocument[]> {
  const products = await client.fetch<ProductDocument[]>(
    FEATURED_PRODUCTS_QUERY,
    {}
  );
  return products;
}

// Fetch a single product by slug
export async function fetchProductBySlug(
  slug: string
): Promise<ProductDocument | null> {
  const product = await client.fetch<ProductDocument | null>(
    PRODUCT_BY_SLUG_QUERY,
    { slug }
  );
  return product;
}

// Fetch products by collection slug
export async function fetchProductsByCollectionSlug(
  collectionSlug: string
): Promise<ProductDocument[]> {
  const products = await client.fetch<ProductDocument[]>(
    PRODUCTS_BY_COLLECTION_SLUG_QUERY,
    { collectionSlug }
  );
  return products;
}

// Fetch all products with basic info
export async function fetchAllProducts(): Promise<ProductDocument[]> {
  const products = await client.fetch<ProductDocument[]>(
    ALL_PRODUCTS_QUERY,
    {}
  );
  return products;
}

// Fetch only active menu items
export async function fetchActiveMenuItems(): Promise<MenuDocument | null> {
  const menu = await client.fetch<MenuDocument | null>(
    ACTIVE_MENU_ITEMS_QUERY,
    {}
  );
  return menu;
}

// Fetch all collections (including those without slugs)
export async function fetchAllCollections(): Promise<CollectionDocument[]> {
  const collections = await client.fetch<CollectionDocument[]>(
    ALL_COLLECTIONS_QUERY,
    {}
  );
  return collections;
}

// Category Icons Fetch Functions
export async function fetchAllCategoryIcons(): Promise<CategoryIconsDocument | null> {
  const categoryIcons = await client.fetch<CategoryIconsDocument | null>(
    ALL_CATEGORY_ICONS_QUERY,
    {}
  );
  return categoryIcons;
}

// Category Highlights Fetch Functions
export async function fetchAllCategoryHighlights(): Promise<CategoryHighlightsDocument | null> {
  const categoryHighlights = await client.fetch<CategoryHighlightsDocument>(
    ALL_CATEGORY_HIGHLIGHTS_QUERY,
    {}
  );
  return categoryHighlights;
}

// Main Banner Fetch Functions
export async function fetchAllMainBanners(): Promise<MainBannerDocument[]> {
  const mainBanners = await client.fetch<MainBannerDocument[]>(
    ALL_MAIN_BANNERS_QUERY,
    {}
  );
  return mainBanners;
}

// Second Banner Fetch Function
export async function fetchSecondBanners(): Promise<SecondBannerDocument[]> {
  const secondBanners =
    await client.fetch<SecondBannerDocument[]>(SECOND_BANNER_QUERY);
  return secondBanners;
}

// Occasion Shopping Fetch Function (reusable with formality parameter)
export async function fetchOccasionProducts(
  formality: "casual" | "formal" | "going-out"
): Promise<OccasionShoppingDocument[]> {
  const occasionProducts = await client.fetch<OccasionShoppingDocument[]>(
    OCCASION_PRODUCTS_QUERY,
    { formality }
  );
  return occasionProducts;
}

// Collection Highlights Fetch Function
export async function fetchCollectionHighlights(): Promise<CollectionHighlightsQueryResult | null> {
  const collectionHighlights =
    await client.fetch<CollectionHighlightsQueryResult | null>(
      ALL_COLLECTION_HIGHLIGHTS_QUERY,
      {}
    );
  return collectionHighlights;
}
