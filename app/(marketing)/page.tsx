import MainBanner from "@/components/MainBanner";
import CategoryIcon from "@/components/CategoryIcon";
import CategoryHighlight from "@/components/CategoryHighlight";
import ShopByOccasion from "@/components/ShopByOccasion";
import SecondBanner from "@/components/SecondBanner";
import CollectionHighlights from "@/components/CollectionHighlights";
import { fetchCollectionHighlights } from "@/lib/sanity/fetch";

export default async function Home() {
  const collectionHighlights = await fetchCollectionHighlights();
  console.log(collectionHighlights);
  return (
    <div className="min-h-screen">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-col-reverse gap-3">
          <CategoryIcon />
          <MainBanner />
        </div>
        <CategoryHighlight />
        <ShopByOccasion />
        <SecondBanner />
        <CollectionHighlights collectionHighlights={collectionHighlights} />
      </div>
    </div>
  );
}
