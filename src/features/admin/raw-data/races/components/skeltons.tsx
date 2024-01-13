export function RaceTableSkeleton() {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-row items-center justify-between border-b border-gray-100 py-4"
        >
          <div className="flex items-center">
            <div className="ml-4 h-4 w-32 rounded-md bg-gray-200"></div>
            <div className="ml-4 h-4 w-24 rounded-md bg-gray-200"></div>
          </div>
          <div className="h-4 w-16 rounded-md bg-gray-200"></div>
        </div>
      ))}
    </div>
  );
}
