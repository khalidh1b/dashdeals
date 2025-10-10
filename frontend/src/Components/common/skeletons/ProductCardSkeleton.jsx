import { Skeleton } from '@/Components/ui/skeleton';

export const ProductCardSkeleton = () => {
    return (
        <div className="mx-auto">
            <div className="relative">
                <Skeleton className="bg-[#F5F5F5] w-[300px] h-[300px] rounded" />
                <Skeleton className="absolute top-5 left-4 h-6 w-16 rounded" />
                <Skeleton className="absolute top-20 left-60 h-12 w-12 rounded-full" />
                <Skeleton className="absolute top-3 left-60 h-12 w-12 rounded-full" />
                <Skeleton className="absolute bottom-0 w-full h-10 rounded-b" />
            </div>

            <Skeleton className="h-6 w-3/4 mt-3" />

            <div className="flex gap-4 py-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
            </div>

            <div className="flex gap-2 items-center">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-8" />
            </div>
        </div>
    )
};