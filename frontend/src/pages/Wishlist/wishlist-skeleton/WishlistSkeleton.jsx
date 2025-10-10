import { Skeleton } from '@/Components/ui/skeleton';
import React from 'react';

const WishlistSkeleton = () => {
    return (
        <>
        {Array.from({ length: 5 }).map((_, idx) => (
            <React.Fragment key={idx}>
                <div>
                    <div className="relative">
                        <Skeleton className="bg-[#F5F5F5] w-[300px] h-[300px] rounded" />
                        <span className="bg-[#4e4c4c] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">
                        <Skeleton className="w-[50px] h-[20px]" />
                        </span>
                        <Skeleton className="bg-[#FFFFFF] dark:text-red-600 absolute top-3 left-60 w-[45px] h-[45px] rounded-full" />
                        <Skeleton className="bg-[#000000] absolute bottom-0 w-[300px] h-[50px] rounded-b" />
                    </div>
                    
                    <Skeleton className="bg-[#000000] w-[250px] h-[20px] rounded mt-3" />

                    <div className="flex gap-4 py-2">
                        <Skeleton className="bg-[#DB4444] w-[100px] h-[20px] rounded" />                
                        <Skeleton className="bg-gray-500 w-[100px] h-[20px] rounded line-through" />
                    </div>
                </div>
            </React.Fragment>
        ))}
        </>
    );
};

export default WishlistSkeleton;