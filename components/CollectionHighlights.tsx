import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { CollectionHighlightsQueryResult } from "@/types";
import { urlFor } from "@/lib/sanity/client";

interface CollectionHighlightsProps {
  collectionHighlights: CollectionHighlightsQueryResult | null;
}

export default function CollectionHighlights({
  collectionHighlights,
}: CollectionHighlightsProps) {
  if (!collectionHighlights || collectionHighlights.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-8 md:py-12">
      <div className="w-full mx-auto px-4">
        {/* Carousel */}
        <Carousel
          autoplay={true}
          autoplayDelay={5000}
          autoplayStopOnInteraction={true}
          autoplayStopOnMouseEnter={true}
          autoplayStopOnFocusIn={false}
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {collectionHighlights.map((highlight, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/2 lg:basis-1/4"
              >
                <Link
                  href={`/collections/${highlight.collection.slug.current}`}
                  className="group block relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    {/* Mobile Image */}
                    <Image
                      src={urlFor(highlight.image)
                        .auto("format")
                        .quality(90)
                        .url()}
                      alt={highlight.image.alt || highlight.title}
                      priority={index < 3}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white/90 text-sm md:text-base">
                        {highlight.collection.name}
                      </p>
                      <span className="inline-block mt-2 text-white text-sm font-medium underline">
                        Shop Now →
                      </span>
                    </div>

                    {/* Static Title (visible on mobile) */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent md:opacity-0">
                      <p className="text-white/90 text-sm">
                        {highlight.collection.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="hidden md:flex absolute top-1/2 left-2 -translate-y-1/2 z-30" />
          <CarouselNext className="hidden md:flex absolute top-1/2 right-2 -translate-y-1/2 z-35" />
        </Carousel>
      </div>
    </section>
  );
}
