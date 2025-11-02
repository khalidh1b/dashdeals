import { Skeleton } from '@/component/ui/skeleton';

const CartTableBodySkeleton = () => {
    return (
        <>
        {
            Array.from({ length: 5}).map((_, idx) => (
            <div key={idx} className="flex items-center justify-center border md:mx-32 mt-9 py-7 rounded shadow-md text-base poppins font-normal px-5 animate-pulse">
            <div className="flex items-center gap-4 w-4/12 relative">
            <Skeleton className="w-12 h-10" />
            <Skeleton className="w-1/2 h-5" />
            </div>
    
            <div className="w-3/12">
            <Skeleton className="w-full h-5" />
            </div>
    
            <div className="w-2/12 pl-10">
            <div className="flex items-center justify-center gap-4 py-1 rounded border-black w-20 border">
                <Skeleton className="w-6 h-5" />
                <div>
                <Skeleton className="w-5 h-5 mb-2" />
                <Skeleton className="w-5 h-5" />
                </div>
            </div>
            </div>
    
            <div className="w-3/12 flex justify-end pr-3">
            <Skeleton className="w-20 h-5" />
            </div>
        </div>
            ))
        }
        </>
    );
};

export default CartTableBodySkeleton;