import { fetchAllCategoryIcons } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export default async function CategoryIcon() {
  const categoryIcons = await fetchAllCategoryIcons();
  if (!categoryIcons?.icons.length) return null;

  return (
    <div className="mx-auto max-w-[1500px] md:px-10">
      <Carousel>
        <CarouselContent className="-ml-2 md:-ml-4">
          {categoryIcons.icons.map((icon, index) => {
            if (!icon.active) return null;
            return (
              <CarouselItem key={index} className="basis-1/8 pl-2 md:pl-4">
                <Link href={`/collections/${icon.collection.slug.current}`}>
                  <div className="flex relative flex-col items-center px-1">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full overflow-hidden">
                      <Image
                        src={urlFor(icon.image)
                          .auto("format")
                          .quality(80)
                          .url()}
                        alt={icon.title}
                        fill
                        sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, (max-width: 1280px) 96px, 112px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h2 className="text-[10px] font-mono sm:text-xs md:text-sm text-center mt-1 px-1">
                    {icon.title}
                  </h2>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-[-20px]" />
        <CarouselNext className="right-[-20px]" />
      </Carousel>
    </div>
  );
}
