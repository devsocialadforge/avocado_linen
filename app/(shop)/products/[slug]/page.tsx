import { fetchProductBySlug } from "@/lib/sanity/fetch";
import { ProductPageClient } from "./ProductPageClient";
import { notFound } from "next/navigation";

interface ProductsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const { slug } = await params;

  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageClient product={product} />;
}
