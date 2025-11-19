import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

export const Image = ({ src, alt, className, containerClassName, desiredWidth, desiredHeight, fallbackSrc, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [currentSrc, setCurrentSrc] = useState(src);

    // Update currentSrc when src prop changes
    useEffect(() => {
        // console.log('Image useEffect - src:', src, 'fallbackSrc:', fallbackSrc);
        if (src) {
            setCurrentSrc(src);
            setHasError(false);
            setIsLoading(true);
        } else if (fallbackSrc) {
            setCurrentSrc(fallbackSrc);
            setHasError(false);
            setIsLoading(true);
        }
    }, [src, fallbackSrc]);

    // For now, disable Cloudinary transformation to debug
    const transformedSrc = currentSrc;

    const handleImageError = () => {
        // console.log('Image error - currentSrc:', currentSrc, 'fallbackSrc:', fallbackSrc);
        if (!hasError && fallbackSrc && currentSrc !== fallbackSrc) {
            // Try fallback image first
            setCurrentSrc(fallbackSrc);
        } else {
            // If fallback also fails or no fallback provided, show error state
            setIsLoading(false);
            setHasError(true);
        }
    };

    // Don't render anything if no valid src
    if (!currentSrc && !fallbackSrc) {
        return (
            <div className={`relative ${containerClassName}`}>
                <div className={`absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center ${className}`}>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">No image</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative ${containerClassName}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            )}
            {hasError ? (
                <div className={`absolute inset-0 bg-gray-300 dark:bg-gray-600 rounded flex items-center justify-center ${className}`}>
                    <span className="text-gray-500 dark:text-gray-400 text-sm">Image not available</span>
                </div>
            ) : (
                <img
                    src={transformedSrc}
                    alt={alt}
                    className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
                    loading="lazy"
                    onLoad={() => setIsLoading(false)}
                    onError={handleImageError}
                    {...props}
                />
            )}
        </div>
    );
};

Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string.isRequired,
    className: PropTypes.string,
    containerClassName: PropTypes.string,
    desiredWidth: PropTypes.number,
    desiredHeight: PropTypes.number
};