import { fetchAllMainBanners } from "@/lib/sanity/fetch";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/client";
import Link from "next/link";

export default async function MainBanner() {
  const mainBanners = await fetchAllMainBanners();

  if (!mainBanners || mainBanners.length === 0) {
    return null;
  }
  const mainBanner = mainBanners[0];

  if (!mainBanner.active) return null;

  return (
    <section className="w-full">
      <div className="mx-auto">
        <Carousel
          autoplay={true}
          autoplayDelay={4000}
          autoplayStopOnInteraction={true}
          autoplayStopOnMouseEnter={false}
          autoplayStopOnFocusIn={false}
        >
          <CarouselContent>
            {mainBanner.mobileImages.map((image, index) => (
              <CarouselItem key={index} className="relative">
                <Link
                  href={image.link || "/"}
                  className="block relative aspect-[16/9] md:aspect-[24/9] overflow-hidden"
                >
                  {/* Mobile optimized image */}
                  <Image
                    src={urlFor(image)
                      .width(828)
                      .height(464)
                      .auto("format")
                      .quality(80)
                      .url()}
                    alt={image.altText || mainBanner.title}
                    priority={index === 0}
                    quality={80}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover md:hidden"
                  />

                  {/* Tablet optimized image */}
                  <Image
                    src={urlFor(image)
                      .width(1200)
                      .height(500)
                      .auto("format")
                      .quality(85)
                      .url()}
                    alt={image.altText || mainBanner.title}
                    priority={index === 0}
                    quality={85}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover hidden md:block lg:hidden"
                  />

                  {/* Desktop optimized image */}
                  <Image
                    src={urlFor(image)
                      .width(1920)
                      .height(640)
                      .auto("format")
                      .quality(90)
                      .url()}
                    alt={image.altText || mainBanner.title}
                    priority={index === 0}
                    quality={90}
                    fill
                  />

                  {/* Large desktop optimized image */}
                  <Image
                    src={urlFor(image)
                      .width(2560)
                      .height(853)
                      .auto("format")
                      .quality(90)
                      .url()}
                    alt={image.altText || mainBanner.title}
                    priority={index === 0}
                    quality={90}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    className="object-cover hidden xl:block"
                  />
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselNext className="hidden md:block absolute top-1/2 right-2 -translate-y-1/2 z-10 text-center mx-auto" />
          <CarouselPrevious className="hidden md:block absolute top-1/2 left-2 -translate-y-1/2 z-10 text-center mx-auto" />
        </Carousel>
      </div>
    </section>
  );
}
