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
  console.log(categoryIcons.icons);

  return (
    <div className="mx-auto max-w-[1500px] md:px-10 py-8">
      <Carousel>
        <CarouselContent>
          {categoryIcons.icons.map((icon, index) => {
            if (!icon.active) return null;
            return (
              <CarouselItem
                key={index}
                className=" basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <Link href={icon.collection.slug.current}>
                  <div className="flex relative flex-col items-center">
                    <Image
                      src={urlFor(icon.image).auto("format").quality(80).url()}
                      alt={icon.title}
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <h2 className="text-xs font-mono sm:text-base text-center mt-2">
                    {icon.title}
                  </h2>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="left-[-20px" />
        <CarouselNext className="right-[-20px]" />
      </Carousel>
    </div>
  );
}
