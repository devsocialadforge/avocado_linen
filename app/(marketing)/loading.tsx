import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-8">
        {/* Main Banner and Category Icon Section */}
        <div className="flex flex-col md:flex-col-reverse gap-3">
          {/* Category Icon Skeleton */}
          <div className="px-4 md:px-6 lg:px-8">
            <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 overflow-x-auto py-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center space-y-2 min-w-[80px]"
                >
                  <Skeleton className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-300" />
                  <Skeleton className="w-16 h-4 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Main Banner Skeleton */}
          <div className="relative">
            <Skeleton className="w-full h-64 md:h-80 lg:h-96 rounded-none bg-gray-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Skeleton className="w-64 h-8 mx-auto rounded bg-gray-200" />
                <Skeleton className="w-48 h-6 mx-auto rounded bg-gray-200" />
                <Skeleton className="w-32 h-10 mx-auto rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Highlight Skeleton */}
        <div className="px-4 md:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="text-center">
              <Skeleton className="w-48 h-8 mx-auto rounded bg-gray-300" />
              <Skeleton className="w-64 h-4 mx-auto mt-2 rounded bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full h-48 rounded-lg bg-gray-300" />
                  <div className="space-y-2">
                    <Skeleton className="w-3/4 h-4 rounded bg-gray-200" />
                    <Skeleton className="w-1/2 h-3 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Shop By Occasion Skeleton */}
        <div className="px-4 md:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="text-center">
              <Skeleton className="w-56 h-8 mx-auto rounded bg-gray-300" />
              <Skeleton className="w-72 h-4 mx-auto mt-2 rounded bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="w-full h-64 rounded-lg bg-gray-300" />
                  <div className="space-y-2">
                    <Skeleton className="w-2/3 h-5 rounded bg-gray-200" />
                    <Skeleton className="w-full h-4 rounded bg-gray-200" />
                    <Skeleton className="w-1/2 h-3 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Banner Skeleton */}
        <div className="px-4 md:px-6 lg:px-8">
          <div className="relative">
            <Skeleton className="w-full h-48 md:h-64 lg:h-80 rounded-lg bg-gray-300" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Skeleton className="w-56 h-8 mx-auto rounded bg-gray-200" />
                <Skeleton className="w-40 h-6 mx-auto rounded bg-gray-200" />
                <Skeleton className="w-28 h-10 mx-auto rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
