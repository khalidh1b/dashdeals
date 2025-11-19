import { Suspense, lazy, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingSkeleton } from '@/components/common/skeletons/loading-skeleton';

// Lazy load layout component
const Navbar = lazy(() => import('@/components/common/navbar/Navbar'));
const Footer = lazy(() => import('@/components/common/footer/Footer'));

const Root = () => {
    // useEffect(() => {
    //    toast("⚠️ We're currently fixing some major bugs. Thanks for your patience!", {
    //       duration: 100000000,
    //     });
    // }, []);

    return (
        <div className='bg-muted/70 dark:bg-gray-700'>
            <Toaster/>
            <Suspense fallback={<LoadingSkeleton />}>
                <Navbar/>
            </Suspense>
            <Outlet/>
            <Suspense fallback={<LoadingSkeleton />}>
                <Footer/>
            </Suspense>
        </div>
    );
};

export default Root;