import { getAllOccasionData } from "@/lib/actions/occasion-actions";
import ShopByOccasionClient from "./ShopByOccasionClient";

export default async function ShopByOccasion() {
  // Fetch all occasion data on the server
  const occasionData = await getAllOccasionData();
  return <ShopByOccasionClient initialData={occasionData} />;
}
