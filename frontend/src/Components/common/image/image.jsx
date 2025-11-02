import { useState } from "react";

export const Image = ({ src, alt, className, containerClassName, desiredWidth, desiredHeight, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const getCloudinaryTransformedUrl = (originalSrc, width, height) => {
        if (!originalSrc || !width || !height) return originalSrc;
        const parts = originalSrc.split('/upload/');
        if (parts.length !== 2) return originalSrc;
        return `${parts[0]}/upload/w_${width},h_${height},c_fill,g_auto,f_auto/` + parts[1];
    };

    const transformedSrc = getCloudinaryTransformedUrl(src, desiredWidth, desiredHeight);

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
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                    {...props}
                />
            )}
        </div>
    );
};