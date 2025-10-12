import { Skeleton } from '@/components/ui/skeleton';
import './style.css';

export const AuthBanner = ({ isLoading, altText, handleImageLoad }) => {
    return (
        <>
            {
                isLoading && <><Skeleton className="w-1/2 h-screen" /></>
            } 
            <div className={`auth-banner-img ${isLoading ? 'hidden' : ''}`}>
                <img 
                    src="https://res.cloudinary.com/dksiicemx/image/upload/v1729422686/authentication-banner_i6gqed.png" 
                    alt={altText} 
                    loading="eager" 
                    onLoad={handleImageLoad}
                />
            </div>
        </>
    )
};