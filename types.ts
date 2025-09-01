// Sanity Base Types
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// Sanity Slug Type
export interface SanitySlug {
  _type: "slug";
  current: string;
}

// Sanity Image Type
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

// Product Types
export interface ProductSize {
  size: string;
  active: boolean;
}

export interface ProductColor {
  name: string;
  image?: SanityImage;
}

export interface Product {
  _id: string;
  _type: "product";
  title: string;
  slug: SanitySlug;
  description: string;
  size: ProductSize[];
  price: number;
  salePrice?: number;
  color: ProductColor[];
  newIn: boolean;
  stock: boolean;
  images: SanityImage[];
  collection?: Collection;
  priority: number;
}

// Collection Types
export interface Collection {
  _id: string;
  _type: "collection";
  name: string; // Changed from title to name to match schema
  slug: SanitySlug;
  description?: string;
}

// Menu Types
export interface MenuItem {
  label: string;
  link?: string;
  collection?: Collection;
  order: number;
  active: boolean;
}

export interface Menu {
  _id: string;
  _type: "menu";
  title: string;
  menuItems: MenuItem[];
}

// Extended types with Sanity base
export type ProductDocument = Product & SanityDocument;
export type CollectionDocument = Collection & SanityDocument;
export type MenuDocument = Menu & SanityDocument;

// Category Icons Types
export interface CategoryIcon {
  _id: string;
  _type: "categoryIcons";
  title: string;
  collection: Collection;
  image: SanityImage;
  order: number;
  active: boolean;
}

// Category Highlights Types
export interface CategoryHighlight {
  _id: string;
  _type: "categoryHighlights";
  title: string;
  collection: Collection;
  image: SanityImage;
  description?: string;
  order: number;
  active: boolean;
}

// Extended types with Sanity base
export type ProductDocument = Product & SanityDocument;
export type CollectionDocument = Collection & SanityDocument;
export type MenuDocument = Menu & SanityDocument;
export type CategoryIconDocument = CategoryIcon & SanityDocument;
export type CategoryHighlightDocument = CategoryHighlight & SanityDocument;

// Occasion Shopping Types
export interface OccasionShopping {
  _id: string;
  _type: "occasionShopping";
  title: string;
  slug: SanitySlug;
  description?: string;
  image: SanityImage;
  collections: Collection[];
  season?: 'spring' | 'summer' | 'fall' | 'winter' | 'all';
  formality?: 'casual' | 'semi-formal' | 'formal' | 'black-tie' | 'any';
  order: number;
  active: boolean;
}

// Extended types with Sanity base
export type ProductDocument = Product & SanityDocument;
export type CollectionDocument = Collection & SanityDocument;
export type MenuDocument = Menu & SanityDocument;
export type CategoryIconDocument = CategoryIcon & SanityDocument;
export type CategoryHighlightDocument = CategoryHighlight & SanityDocument;
export type OccasionShoppingDocument = OccasionShopping & SanityDocument;

// Collection Highlights Types
export interface CollectionHighlight {
  _id: string;
  _type: "collectionHighlights";
  title: string;
  collection: Collection;
  image: SanityImage;
  order: number;
  active: boolean;
}

// Extended types with Sanity base
export type ProductDocument = Product & SanityDocument;
export type CollectionDocument = Collection & SanityDocument;
export type MenuDocument = Menu & SanityDocument;
export type CategoryIconDocument = CategoryIcon & SanityDocument;
export type CategoryHighlightDocument = CategoryHighlight & SanityDocument;
export type OccasionShoppingDocument = OccasionShopping & SanityDocument;
export type CollectionHighlightDocument = CollectionHighlight & SanityDocument;

// Avocado Women Types
export interface AvocadoWomen {
  _id: string;
  _type: "avocadoWomen";
  name: string;
  image: SanityImage;
  review: string;
  rating: number;
  location?: string;
  order: number;
  active: boolean;
}

// Extended types with Sanity base
export type ProductDocument = Product & SanityDocument;
export type CollectionDocument = Collection & SanityDocument;
export type MenuDocument = Menu & SanityDocument;
export type CategoryIconDocument = CategoryIcon & SanityDocument;
export type CategoryHighlightDocument = CategoryHighlight & SanityDocument;
export type OccasionShoppingDocument = OccasionShopping & SanityDocument;
export type CollectionHighlightDocument = CollectionHighlight & SanityDocument;
export type AvocadoWomenDocument = AvocadoWomen & SanityDocument;
