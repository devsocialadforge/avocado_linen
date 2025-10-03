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
  "mainImage": images[]{
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
  "mainImage": images[]{
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
  && $collectionSlug in collections[]->slug.current
]|order(priority desc, _createdAt desc){
  _id,
  _createdAt,
  _updatedAt,
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
  priority,
  "size": size[active == true]{
    size,
    active
  },
  "color": color[]{
    name,
    "image": image{
      asset->{
        _id,
        url
      },
      alt
    }
  },
  "images": images[]{
    asset->{
      _id,
      url
    },
    alt
  },
  "collection": collections[slug.current == $collectionSlug][0]->{
    _id,
    name,
    slug
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
    "collections": collections[]->{
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
export const ALL_CATEGORY_ICONS_QUERY = `*[_type == "categoryIcons"][0]{
  _id,
  icons[active == true]|order(priority desc, _createdAt desc){
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
    priority,
    active
  }
}`;

// Category Highlights Queries
export const ALL_CATEGORY_HIGHLIGHTS_QUERY = `*[_type == "categoryHighlights"][0]{
  _id,
  highlights[active == true]|order(order desc, _createdAt desc){
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
  }
}`;

// Main Banner Queries
export const ALL_MAIN_BANNERS_QUERY = `*[
  _type == "mainBanner"
  && active == true
]|order(order asc, _createdAt desc){
  _id,
  title,
  "mobileImages": mobileImages[]{
    asset->{
      _id,
      url
    },
    altText,
    link
  },
  "desktopImages": desktopImages[]{
    asset->{
      _id,
      url
    },
    altText,
    link
  },
  link,
  altText,
  order,
  active
}`;

export const MAIN_BANNER_BY_ID_QUERY = `*[
  _type == "mainBanner"
  && _id == $id
][0]{
  _id,
  title,
  "mobileImages": mobileImages[]{
    asset->{
      _id,
      url
    },
    altText,
    link
  },
  "desktopImages": desktopImages[]{
    asset->{
      _id,
      url
    },
    altText,
    link
  },
  link,
  altText,
  order,
  active
}`;

// Second Banner Queries

export const SECOND_BANNER_BY_ID_QUERY = `*[
  _type == "secondBanner"
  && _id == $id
][0]{
  _id,
  title,
  "mobileImages": mobileImages[]{
    asset->{
      _id,
      url
    },
    altText,
    link
  },
  "desktopImages": desktopImages[]{
    asset->{
      _id,
      url
    },
    altText,
    link
  },
  link,
  altText,
  order,
  active
}`;

// Second Banner Query
export const SECOND_BANNER_QUERY = `*[_type == "secondBanner"]|order(_createdAt desc){
  _id,
  _type,
  title,
  url,
  "image": image{
    asset->{
      _id,
      url
    },
    alt
  }
}`;

// Occasion Shopping Query (reusable with formality parameter)
export const OCCASION_PRODUCTS_QUERY = `*[
  _type == "occasionShopping"
  && active == true
  && formality == $formality
]|order(order desc, _createdAt desc){
  _id,
  title,
  slug,
  "products": products[]->{
    _id,
    title,
    slug,
    price,
    stock,
    salePrice,
    "discountPercentage": select(
      defined(salePrice) && salePrice < price => round(((price - salePrice) / price) * 100),
      null
    ),
    "images": images[]{
      asset->{
        _id,
        url
      },
      alt
    }
  },
  formality,
  order,
  active
}`;

// Collection Highlights Query
export const ALL_COLLECTION_HIGHLIGHTS_QUERY = `*[_type == "collectionHighlights"][0].items[active == true]{
  title,
  "collection": collection->{
    _id,
    name,
    slug
  },
  image
}`;
