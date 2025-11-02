import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LoadingSkeleton } from '@/component/common/skeletons/loading-skeleton';

// Lazy load layout component
const Navbar = lazy(() => import('@/component/common/navbar/Navbar'));
const Footer = lazy(() => import('@/component/common/footer/Footer'));

const Root = () => {
    return (
        <div>
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
