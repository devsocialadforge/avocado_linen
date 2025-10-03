import { fetchCollectionHighlights } from "@/lib/sanity/fetch";
export default async function ExamplePage() {
  const collectionHighlights = await fetchCollectionHighlights();
  console.log(collectionHighlights);
  return <div className="container mx-auto">Example Page</div>;
}
