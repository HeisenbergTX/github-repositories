import { Skeleton } from "@heroui/react";

export const SkeletonComponent = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="px-4">
      {array.map((item) => (
        <div
          key={item}
          className="w-full h-fit border-1 border-default-700/50 border-solid p-4 my-4 rounded-xl"
        >
          <div className="flex items-start pb-2">
            <Skeleton className="w-8 h-8 rounded-md" />
            <div className="flex items-center">
              <Skeleton className="ml-2 mr-0.5 w-16 h-4 rounded-md" />
              <Skeleton className="align-middle mx-1 w-2 h-1 rounded-xs" />
              <Skeleton className="ml-0.5 w-12 h-4 rounded-md" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Skeleton className="w-3/4 h-3.5 rounded-md" />
            <Skeleton className="w-2/4 h-3.5 rounded-md" />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            <Skeleton className="w-12 h-3.5 rounded-md" />
            <Skeleton className="w-12 h-3.5 rounded-md" />
            <Skeleton className="w-12 h-3.5 rounded-md" />
            <Skeleton className="w-12 h-3.5 rounded-md" />
          </div>
          <div className="mt-2 flex items-center">
            <Skeleton className="mr-2 w-16 h-3 rounded-md" />
            <Skeleton className="w-[1px] h-3 " disableAnimation={false} />
            <Skeleton className="mx-2 w-8 h-3 rounded-md" />
            <Skeleton className="w-[1px] h-3 " disableAnimation={false} />
            <Skeleton className="ml-2 w-8 h-3 rounded-md" />
          </div>
          <Skeleton className="mt-1 w-60 h-3 rounded-md" />
        </div>
      ))}
    </div>
  );
};
