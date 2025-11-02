import React, { Suspense } from 'react';
import { LoadingSkeleton } from '@/component/common/skeletons/loading-skeleton';

export const dynamicImport = (importFunc, fallback = <LoadingSkeleton />) => {
  const LazyComponent = React.lazy(importFunc);
  
  const ComponentWithDisplayName = (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
  
  ComponentWithDisplayName.displayName = 'DynamicImport';
  return ComponentWithDisplayName;
};

export const createLazyComponent = (importPath, fallback) => {
  return dynamicImport(() => import(importPath), fallback);
};

export const preloadComponent = (importFunc) => {
  importFunc();
};

export const preloadcomponent = (importFuncs) => {
  importFuncs.forEach(importFunc => {
    importFunc().catch(() => {
      // console.warn(`Failed to preload: ${importFunc.name}`);
    });
  });
};
