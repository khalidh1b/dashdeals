import React, { Suspense } from 'react';
import LoadingSkeleton from '@/components/common/skeletons/loading-skeleton';

export const dynamicImport = (importFunc, fallback = <LoadingSkeleton />) => {
  const LazyComponent = React.lazy(importFunc);
  
  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export const createLazyComponent = (importPath, fallback) => {
  return dynamicImport(() => import(importPath), fallback);
};

export const preloadComponent = (importFunc) => {
  importFunc();
};

export const preloadComponents = (importFuncs) => {
  importFuncs.forEach(importFunc => {
    importFunc().catch(() => {
      // console.warn(`Failed to preload: ${importFunc.name}`);
    });
  });
};