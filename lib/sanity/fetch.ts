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
  ALL_OCCASION_SHOPPING_QUERY,
  OCCASION_SHOPPING_BY_SLUG_QUERY,
  OCCASION_SHOPPING_BY_SEASON_QUERY,
  OCCASION_SHOPPING_BY_FORMALITY_QUERY,
  ALL_COLLECTION_HIGHLIGHTS_QUERY,
  COLLECTION_HIGHLIGHT_BY_ID_QUERY,
  COLLECTION_HIGHLIGHTS_BY_COLLECTION_QUERY,
  COLLECTION_HIGHLIGHTS_BY_COLLECTION_SLUG_QUERY,
  ALL_AVOCADO_WOMEN_QUERY,
  AVOCADO_WOMEN_BY_ID_QUERY,
  AVOCADO_WOMEN_BY_RATING_QUERY,
  AVOCADO_WOMEN_BY_LOCATION_QUERY,
  TOP_RATED_AVOCADO_WOMEN_QUERY,
} from "./querys";
import {
  ProductDocument,
  MenuDocument,
  CollectionDocument,
  CategoryIconDocument,
  CategoryHighlightDocument,
  OccasionShoppingDocument,
  CollectionHighlightDocument,
  AvocadoWomenDocument,
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
export async function fetchAllCategoryIcons(): Promise<CategoryIconDocument[]> {
  const categoryIcons = await client.fetch<CategoryIconDocument[]>(
    ALL_CATEGORY_ICONS_QUERY,
    {}
  );
  return categoryIcons;
}

// Category Highlights Fetch Functions
export async function fetchAllCategoryHighlights(): Promise<
  CategoryHighlightDocument[]
> {
  const categoryHighlights = await client.fetch<CategoryHighlightDocument[]>(
    ALL_CATEGORY_HIGHLIGHTS_QUERY,
    {}
  );
  return categoryHighlights;
}

// Occasion Shopping Fetch Functions
export async function fetchAllOccasionShopping(): Promise<OccasionShoppingDocument[]> {
  const occasions = await client.fetch<OccasionShoppingDocument[]>(
    ALL_OCCASION_SHOPPING_QUERY,
    {}
  );
  return occasions;
}

export async function fetchOccasionShoppingBySlug(
  slug: string
): Promise<OccasionShoppingDocument | null> {
  const occasion = await client.fetch<OccasionShoppingDocument | null>(
    OCCASION_SHOPPING_BY_SLUG_QUERY,
    { slug }
  );
  return occasion;
}

export async function fetchOccasionShoppingBySeason(
  season: string
): Promise<OccasionShoppingDocument[]> {
  const occasions = await client.fetch<OccasionShoppingDocument[]>(
    OCCASION_SHOPPING_BY_SEASON_QUERY,
    { season }
  );
  return occasions;
}

export async function fetchOccasionShoppingByFormality(
  formality: string
): Promise<OccasionShoppingDocument[]> {
  const occasions = await client.fetch<OccasionShoppingDocument[]>(
    OCCASION_SHOPPING_BY_FORMALITY_QUERY,
    { formality }
  );
  return occasions;
}

// Collection Highlights Fetch Functions
export async function fetchAllCollectionHighlights(): Promise<CollectionHighlightDocument[]> {
  const collectionHighlights = await client.fetch<CollectionHighlightDocument[]>(
    ALL_COLLECTION_HIGHLIGHTS_QUERY,
    {}
  );
  return collectionHighlights;
}

export async function fetchCollectionHighlightById(
  id: string
): Promise<CollectionHighlightDocument | null> {
  const collectionHighlight = await client.fetch<CollectionHighlightDocument | null>(
    COLLECTION_HIGHLIGHT_BY_ID_QUERY,
    { id }
  );
  return collectionHighlight;
}

export async function fetchCollectionHighlightsByCollection(
  collectionId: string
): Promise<CollectionHighlightDocument[]> {
  const collectionHighlights = await client.fetch<CollectionHighlightDocument[]>(
    COLLECTION_HIGHLIGHTS_BY_COLLECTION_QUERY,
    { collectionId }
  );
  return collectionHighlights;
}

export async function fetchCollectionHighlightsByCollectionSlug(
  collectionSlug: string
): Promise<CollectionHighlightDocument[]> {
  const collectionHighlights = await client.fetch<CollectionHighlightDocument[]>(
    COLLECTION_HIGHLIGHTS_BY_COLLECTION_SLUG_QUERY,
    { collectionSlug }
  );
  return collectionHighlights;
}

// Avocado Women Fetch Functions
export async function fetchAllAvocadoWomen(): Promise<AvocadoWomenDocument[]> {
  const avocadoWomen = await client.fetch<AvocadoWomenDocument[]>(
    ALL_AVOCADO_WOMEN_QUERY,
    {}
  );
  return avocadoWomen;
}

export async function fetchAvocadoWomenById(
  id: string
): Promise<AvocadoWomenDocument | null> {
  const avocadoWomen = await client.fetch<AvocadoWomenDocument | null>(
    AVOCADO_WOMEN_BY_ID_QUERY,
    { id }
  );
  return avocadoWomen;
}

export async function fetchAvocadoWomenByRating(
  minRating: number
): Promise<AvocadoWomenDocument[]> {
  const avocadoWomen = await client.fetch<AvocadoWomenDocument[]>(
    AVOCADO_WOMEN_BY_RATING_QUERY,
    { minRating }
  );
  return avocadoWomen;
}

export async function fetchAvocadoWomenByLocation(
  location: string
): Promise<AvocadoWomenDocument[]> {
  const avocadoWomen = await client.fetch<AvocadoWomenDocument[]>(
    AVOCADO_WOMEN_BY_LOCATION_QUERY,
    { location }
  );
  return avocadoWomen;
}

export async function fetchTopRatedAvocadoWomen(): Promise<AvocadoWomenDocument[]> {
  const avocadoWomen = await client.fetch<AvocadoWomenDocument[]>(
    TOP_RATED_AVOCADO_WOMEN_QUERY,
    {}
  );
  return avocadoWomen;
}
