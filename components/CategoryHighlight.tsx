import { fetchAllCategoryHighlights } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryHighlight() {
  const categoryHighlights = await fetchAllCategoryHighlights();
  if (!categoryHighlights?.highlights?.length) return null;

  return (
    <div className="mx-auto px-3  md:px-10">
      <div className="grid mx-auto grid-cols-2 md:grid-cols-4 gap-4">
        {categoryHighlights.highlights.map((highlight, index) => {
          if (!highlight.active) return null;
          return (
            <Link
              key={index}
              href={`/collections/${highlight.collection.slug.current}`}
              className="group"
            >
              <div className="relative overflow-hidden  aspect-square]">
                <Image
                  src={urlFor(highlight.image).auto("format").quality(90).url()}
                  alt={highlight.title}
                  width={300}
                  height={300}
                  quality={85}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
