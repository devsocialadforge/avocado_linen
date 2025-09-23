import { fetchOccasionProducts } from "@/lib/sanity/fetch";
import { OccasionShoppingDocument } from "@/types";

export async function getAllOccasionData(): Promise<{
  formal: OccasionShoppingDocument[];
  casual: OccasionShoppingDocument[];
  "going-out": OccasionShoppingDocument[];
}> {
  try {
    // Fetch all occasion data in parallel for better performance
    const [formalData, casualData, goingOutData] = await Promise.all([
      fetchOccasionProducts("formal"),
      fetchOccasionProducts("casual"),
      fetchOccasionProducts("going-out"),
    ]);

    return {
      formal: formalData,
      casual: casualData,
      "going-out": goingOutData,
    };
  } catch (error) {
    console.error("Error fetching occasion data:", error);
    // Return empty arrays as fallback
    return {
      formal: [],
      casual: [],
      "going-out": [],
    };
  }
}
