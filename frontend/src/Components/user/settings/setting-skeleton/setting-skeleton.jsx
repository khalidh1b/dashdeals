import { Skeleton } from '@/components/ui/skeleton';
import Footer from '@/components/common/footer/Footer';
import Navbar from '@/components/common/navbar/Navbar';

export const SettingSkeleton = () => {
    return (
        <>
        <Navbar/>
        <div className="border-2 rounded-md px-9 py-10 h-screen">
          <Skeleton className="h-8 w-48 mb-4" /> {/* Title */}
          <Skeleton className="h-5 w-64 mb-5" /> {/* Subtitle */}
          <hr className="border-t mb-4 border-[#27272A]" />
          <div className="flex gap-8">
            <nav className="grid gap-2 w-3/12">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-10 w-full rounded-md" /> 
              ))}
            </nav>
            <div className="flex-1">
              <Skeleton className="h-96 w-full rounded-md" /> {/* Content area */}
            </div>
          </div>
        </div>
        <Footer/>
      </>
    );
};