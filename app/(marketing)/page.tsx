import { fetchActiveMenuItems } from "@/lib/sanity/fetch";
export default async function Home() {
  const menu = await fetchActiveMenuItems();
  console.log(menu);

  return (
    <div className="min-h-screen bg-background">
      <h1>Home</h1>
    </div>
  );
}
