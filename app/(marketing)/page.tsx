import MainBanner from "@/components/MainBanner";
import CategoryIcon from "@/components/CategoryIcon";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <div className="space-y-3">
        <div className="flex flex-col md:flex-col-reverse gap-3">
          <CategoryIcon />
          <MainBanner />
        </div>
      </div>
    </div>
  );
}
