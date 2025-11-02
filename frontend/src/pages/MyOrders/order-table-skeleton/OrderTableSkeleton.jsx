import { Skeleton } from '@/component/ui/skeleton';
import React from 'react';

const OrderTableSkeleton = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (  // Adjust this length to match your expected rows
                <React.Fragment key={index}>
                        <tr className="border">
                        <td><Skeleton className="w-[50px] h-[50px] rounded-lg" /></td>
                        <td><Skeleton className="w-[100px] h-[20px]" /></td>
                        <td><Skeleton className="w-[200px] h-[20px]" /></td>
                        <td><Skeleton className="w-[80px] h-[20px]" /></td>
                        <td><Skeleton className="w-[100px] h-[20px]" /></td>
                        <td><Skeleton className="w-[30px] h-[30px]" /></td>
                    </tr>
                </React.Fragment>
            ))}
        </>
    );
};

export default OrderTableSkeleton;