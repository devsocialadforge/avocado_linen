import { urlFor } from "@/lib/sanity/client";
import { fetchSecondBanners } from "@/lib/sanity/fetch";
import Image from "next/image";
import Link from "next/link";

export default async function SecondBanner() {
  const secondBanner = await fetchSecondBanners();
  console.log(secondBanner, "secondBanner");
  if (secondBanner.length === 0) return null;

  return (
    <div className="w-full mx-auto">
      {secondBanner.map((banner, index) => (
        <div key={banner._id} className="relative w-full mb-4 sm:mb-6">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/9] xl:aspect-[32/9] overflow-hidden">
            <Link href={banner.url} className="block relative w-full h-full">
              {/* Mobile optimized image */}
              <Image
                src={urlFor(banner.image)
                  .width(640)
                  .height(360)
                  .auto("format")
                  .quality(75)
                  .url()}
                alt={banner.image.alt || "second banner"}
                fill
                priority={index === 0}
                quality={75}
                className="object-cover sm:hidden"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />

              {/* Tablet optimized image */}
              <Image
                src={urlFor(banner.image)
                  .width(1024)
                  .height(488)
                  .auto("format")
                  .quality(80)
                  .url()}
                alt={banner.image.alt || "second banner"}
                fill
                priority={index === 0}
                quality={80}
                className="object-cover hidden sm:block lg:hidden"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />

              {/* Desktop optimized image */}
              <Image
                src={urlFor(banner.image)
                  .width(1920)
                  .height(640)
                  .auto("format")
                  .quality(85)
                  .url()}
                alt={banner.image.alt || "second banner"}
                fill
                priority={index === 0}
                quality={85}
                className="object-cover hidden lg:block"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
