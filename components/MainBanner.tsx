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
  console.log(mainBanner);
  if (!mainBanner.active) return null;
  return (
    <section className="w-full">
      <div className=" mx-auto ">
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
                  <Image
                    src={urlFor(image).auto("format").quality(100).url()}
                    alt={image.altText || mainBanner.title}
                    priority
                    fill
                    className="object-cover"
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
