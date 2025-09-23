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
  _createdAt: string;
  _updatedAt: string;
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
  discountPercentage?: number;
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
  collections?: Collection[];
  order: number;
  active: boolean;
}

export interface Menu {
  _id: string;
  _type: "menu";
  title: string;
  menuItems: MenuItem[];
}

// Category Icons Types
export interface CategoryIconItem {
  title: string;
  collection: Collection;
  image: SanityImage;
  priority: number;
  active: boolean;
}

export interface CategoryIcons {
  _id: string;
  _type: "categoryIcons";
  icons: CategoryIconItem[];
}

// Category Highlights Types
export interface CategoryHighlightItem {
  title: string;
  collection: Collection;
  image: SanityImage;
  order: number;
  active: boolean;
}

export interface CategoryHighlights {
  _id: string;
  _type: "categoryHighlights";
  highlights: CategoryHighlightItem[];
}

// Occasion Shopping Types
export interface OccasionShopping {
  _id: string;
  _type: "occasionShopping";
  title: string;
  slug: SanitySlug;
  image: SanityImage;
  stock: boolean;
  products: Product[];
  formality: "casual" | "formal" | "going-out";
  order: number;
  active: boolean;
}

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

// Banner Image Type (for individual images in the array)
export interface BannerImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  altText?: string;
  link?: string;
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

// Main Banner Types
export interface MainBanner {
  _id: string;
  _type: "mainBanner";
  title: string;
  mobileImages: BannerImage[];
  desktopImages: BannerImage[];
  link?: string;
  altText?: string;
  order: number;
  active: boolean;
}

// Second Banner Types
export interface SecondBanner {
  _id: string;
  _type: "secondBanner";
  title: string;
  url: string;
  image: SanityImage;
}

// Extended types with Sanity base
export type ProductDocument = Product & SanityDocument;
export type CollectionDocument = Collection & SanityDocument;
export type MenuDocument = Menu & SanityDocument;
export type CategoryIconsDocument = CategoryIcons & SanityDocument;
export type CategoryHighlightsDocument = CategoryHighlights & SanityDocument;
export type OccasionShoppingDocument = OccasionShopping & SanityDocument;
export type CollectionHighlightDocument = CollectionHighlight & SanityDocument;
export type AvocadoWomenDocument = AvocadoWomen & SanityDocument;
export type MainBannerDocument = MainBanner & SanityDocument;
export type SecondBannerDocument = SecondBanner & SanityDocument;

// Occasion Shopping Query Result Types
export interface OccasionProductQueryResult {
  _id: string;
  title: string;
  slug: SanitySlug;
  price: number;
  salePrice?: number;
  discountPercentage?: number;
  mainImage: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  }[];
}

export interface OccasionShoppingQueryResult {
  _id: string;
  _type: "occasionShopping";
  title: string;
  slug: SanitySlug;
  image: SanityImage;
  products: OccasionProductQueryResult[];
  formality: "casual" | "formal" | "going-out";
  order: number;
  active: boolean;
}
