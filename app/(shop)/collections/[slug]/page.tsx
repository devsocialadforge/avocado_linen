import { fetchProductsByCollectionSlug } from "@/lib/sanity/fetch";
import CollectionPageClient from "./CollectionPageClient";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  console.log(slug, "slug");

  const products = await fetchProductsByCollectionSlug(slug);

  if (products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Collection not found
          </h1>
          <p className="text-gray-600">
            The collection you&apos;re looking for doesn&apos;t exist or has no
            products.
          </p>
        </div>
      </div>
    );
  }
  // Get collection name from slug (perf-friendly)
  const collectionName =
    slug.indexOf("-") === -1 ? slug : slug.split("-").join(" ");

  return (
    <CollectionPageClient
      products={products}
      collectionName={collectionName}
      collectionSlug={slug}
    />
  );
}
