export default function DishCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-md animate-pulse">
      <div className="w-full h-48 bg-neutral-200 dark:bg-neutral-800" />
      <div className="flex flex-col gap-3 p-4">
        <div className="h-4 w-3/4 bg-neutral-200 dark:bg-neutral-800 rounded" />
        <div className="h-9 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl" />
      </div>
    </div>
  );
}
