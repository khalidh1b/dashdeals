import { Skeleton } from "@/components/ui/skeleton"

const LoadingSkeleton = () => {
    return (
        <div className='pb-20 h-screen'>
            <div className='mx-20'>
                <Skeleton className='h-8 w-48 mt-8 mb-2' />
                <Skeleton className='h-6 w-32 mb-4' />

                <ul className='flex gap-10 pt-7 pb-6'>
                    <Skeleton className='h-6 w-20' />
                    <Skeleton className='h-6 w-20' />
                    <Skeleton className='h-6 w-20' />
                </ul>
            </div>
            <div>
                <Skeleton className='h-64 w-full' />
            </div>
        </div>
    );
};

export default LoadingSkeleton;