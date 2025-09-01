// Product Queries
export const PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
]|order(priority desc, _createdAt desc){
  _id,
  title,
  slug,
  description,
  price,
  salePrice,
  "discountPercentage": select(
    defined(salePrice) && salePrice < price => round(((price - salePrice) / price) * 100),
    null
  ),
  newIn,
  stock,
  priority,
  "images": images[]{
    asset->{
      _id,
      url
    },
    alt
  },
  "collection": collection->{
    _id,
    title,
    slug
  }
}`;

export const FEATURED_PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && newIn == true
]|order(priority desc, _createdAt desc)[0...8]{
  _id,
  title,
  slug,
  price,
  salePrice,
  "discountPercentage": select(
    defined(salePrice) && salePrice < price => round(((price - salePrice) / price) * 100),
    null
  ),
  "mainImage": images[0]{
    asset->{
      _id,
      url
    },
    alt
  }
}`;

export const PRODUCT_BY_SLUG_QUERY = `*[
  _type == "product"
  && slug.current == $slug
][0]{
  _id,
  title,
  slug,
  description,
  price,
  salePrice,
  "discountPercentage": select(
    defined(salePrice) && salePrice < price => round(((price - salePrice) / price) * 100),
    null
  ),
  "sizes": size[]{
    size,
    active
  },
  "colors": color[]{
    name,
    "image": image{
      asset->{
        _id,
        url
      },
      alt
    }
  },
  newIn,
  stock,
  priority,
  "images": images[]{
    asset->{
      _id,
      url
    },
    alt
  },
  "collection": collection->{
    _id,
    title,
    slug
  }
}`;

export const PRODUCTS_BY_COLLECTION_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && collection._ref == $collectionId
]|order(priority desc, _createdAt desc){
  _id,
  title,
  slug,
  price,
  salePrice,
  "discountPercentage": select(
    defined(salePrice) && salePrice < price => round(((price - salePrice) / price) * 100),
    null
  ),
  "mainImage": images[0]{
    asset->{
      _id,
      url
    },
    alt
  }
}`;

export const PRODUCTS_BY_COLLECTION_SLUG_QUERY = `*[
  _type == "product"
  && defined(slug.current)
  && collection->slug.current == $collectionSlug
]|order(priority desc, _createdAt desc){
  _id,
  title,
  slug,
  price,
  salePrice,
  "discountPercentage": select(
    defined(salePrice) && salePrice < price => round(((price - salePrice) / price) * 100),
    null
  ),
  "mainImage": images[0]{
    asset->{
      _id,
      url
    },
    alt
  }
}`;

export const ALL_PRODUCTS_QUERY = `*[
  _type == "product"
  && defined(slug.current)
]|order(priority desc, _createdAt desc){
  _id,
  title,
  slug,
  price,
  salePrice,
  "discountPercentage": select(
    defined(salePrice) && salePrice < price => round(((price - salePrice) / price) * 100),
    null
  ),
  newIn,
  stock,
  priority
}`;

// Menu Queries
export const ACTIVE_MENU_ITEMS_QUERY = `*[_type == "menu"][0]{
  _id,
  title,
  menuItems[active == true]|order(order asc){
    label,
    link,
    "collection": collection->{
      _id,
      name,
      slug
    },
    order,
    active
  }
}`;

// Collection Queries

export const ALL_COLLECTIONS_QUERY = `*[
  _type == "collection"
]|order(_createdAt desc){
  _id,
  name,
  slug,
  description
}`;

// Category Icons Queries
export const ALL_CATEGORY_ICONS_QUERY = `*[
  _type == "categoryIcons"
  && active == true
]|order(order desc, _createdAt desc){
  _id,
  title,
  "collection": collection->{
    _id,
    name,
    slug
  },
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  active
}`;

// Category Highlights Queries
export const ALL_CATEGORY_HIGHLIGHTS_QUERY = `*[
  _type == "categoryHighlights"
  && active == true
]|order(order desc, _createdAt desc){
  _id,
  title,
  "collection": collection->{
    _id,
    name,
    slug
  },
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  description,
  order,
  active
}`;

// Occasion Shopping Queries
export const ALL_OCCASION_SHOPPING_QUERY = `*[
  _type == "occasionShopping"
  && active == true
]|order(order desc, _createdAt desc){
  _id,
  title,
  slug,
  description,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  "collections": collections[]->{
    _id,
    name,
    slug
  },
  season,
  formality,
  order,
  active
}`;

export const OCCASION_SHOPPING_BY_SLUG_QUERY = `*[
  _type == "occasionShopping"
  && slug.current == $slug
  && active == true
][0]{
  _id,
  title,
  slug,
  description,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  "collections": collections[]->{
    _id,
    name,
    slug
  },
  season,
  formality,
  order,
  active
}`;

export const OCCASION_SHOPPING_BY_SEASON_QUERY = `*[
  _type == "occasionShopping"
  && active == true
  && (season == $season || season == "all")
]|order(order desc, _createdAt desc){
  _id,
  title,
  slug,
  description,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  "collections": collections[]->{
    _id,
    name,
    slug
  },
  season,
  formality,
  order,
  active
}`;

export const OCCASION_SHOPPING_BY_FORMALITY_QUERY = `*[
  _type == "occasionShopping"
  && active == true
  && (formality == $formality || formality == "any")
]|order(order desc, _createdAt desc){
  _id,
  title,
  slug,
  description,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  "collections": collections[]->{
    _id,
    name,
    slug
  },
  season,
  formality,
  order,
  active
}`;

// Collection Highlights Queries
export const ALL_COLLECTION_HIGHLIGHTS_QUERY = `*[
  _type == "collectionHighlights"
  && active == true
]|order(order desc, _createdAt desc){
  _id,
  title,
  "collection": collection->{
    _id,
    name,
    slug
  },
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  active
}`;

export const COLLECTION_HIGHLIGHT_BY_ID_QUERY = `*[
  _type == "collectionHighlights"
  && _id == $id
][0]{
  _id,
  title,
  "collection": collection->{
    _id,
    name,
    slug
  },
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  active
}`;

export const COLLECTION_HIGHLIGHTS_BY_COLLECTION_QUERY = `*[
  _type == "collectionHighlights"
  && active == true
  && collection._ref == $collectionId
]|order(order desc, _createdAt desc){
  _id,
  title,
  "collection": collection->{
    _id,
    name,
    slug
  },
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  active
}`;

export const COLLECTION_HIGHLIGHTS_BY_COLLECTION_SLUG_QUERY = `*[
  _type == "collectionHighlights"
  && active == true
  && collection->slug.current == $collectionSlug
]|order(order desc, _createdAt desc){
  _id,
  title,
  "collection": collection->{
    _id,
    name,
    slug
  },
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  order,
  active
}`;

// Avocado Women Queries
export const ALL_AVOCADO_WOMEN_QUERY = `*[
  _type == "avocadoWomen"
  && active == true
]|order(order desc, _createdAt desc){
  _id,
  name,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  review,
  rating,
  location,
  order,
  active
}`;

export const AVOCADO_WOMEN_BY_ID_QUERY = `*[
  _type == "avocadoWomen"
  && _id == $id
][0]{
  _id,
  name,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  review,
  rating,
  location,
  order,
  active
}`;

export const AVOCADO_WOMEN_BY_RATING_QUERY = `*[
  _type == "avocadoWomen"
  && active == true
  && rating >= $minRating
]|order(rating desc, order desc, _createdAt desc){
  _id,
  name,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  review,
  rating,
  location,
  order,
  active
}`;

export const AVOCADO_WOMEN_BY_LOCATION_QUERY = `*[
  _type == "avocadoWomen"
  && active == true
  && location match $location
]|order(order desc, _createdAt desc){
  _id,
  name,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  review,
  rating,
  location,
  order,
  active
}`;

export const TOP_RATED_AVOCADO_WOMEN_QUERY = `*[
  _type == "avocadoWomen"
  && active == true
  && rating == 5
]|order(order desc, _createdAt desc){
  _id,
  name,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  },
  review,
  rating,
  location,
  order,
  active
}`;
