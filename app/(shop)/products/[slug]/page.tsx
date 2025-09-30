import { fetchProductBySlug } from "@/lib/sanity/fetch";
import { ProductPageClient } from "./ProductPageClient";

interface ProductsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { slug } = await params;

  const product = await fetchProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Product not found
          </h1>
          <p className="text-gray-600">
            The product you&apos;re looking for doesn&apos;t exist or has no
            product.
          </p>
        </div>
      </div>
    );
  }

  return <ProductPageClient product={product} />;
}
