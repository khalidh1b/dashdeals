import { useState } from "react";

export const Image = ({ src, alt, className, containerClassName, ...props }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

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
                    src={src}
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