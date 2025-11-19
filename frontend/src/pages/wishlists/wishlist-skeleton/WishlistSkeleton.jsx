import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const WishlistSkeleton = () => {
    return (
        <>
        {Array.from({ length: 5 }).map((_, idx) => (
            <React.Fragment key={idx}>
                <div>
                    <div className="relative">
                        <Skeleton className="bg-muted dark:bg-gray-800 w-[300px] h-[300px] rounded" />
                        <span className="bg-muted-foreground absolute top-5 left-4 text-white py-1 px-4 rounded poppins">
                        <Skeleton className="w-[50px] h-[20px]" />
                        </span>
                        <Skeleton className="bg-background dark:bg-gray-700 absolute top-3 left-60 w-[45px] h-[45px] rounded-full" />
                        <Skeleton className="bg-foreground dark:bg-gray-900 absolute bottom-0 w-[300px] h-[50px] rounded-b" />
                    </div>
                    
                    <Skeleton className="bg-foreground dark:bg-gray-900 w-[250px] h-[20px] rounded mt-3" />

                    <div className="flex gap-4 py-2">
                        <Skeleton className="bg-red-600 w-[100px] h-[20px] rounded" />                
                        <Skeleton className="bg-muted-foreground w-[100px] h-[20px] rounded line-through" />
                    </div>
                </div>
            </React.Fragment>
        ))}
        </>
    );
};

export default WishlistSkeleton;