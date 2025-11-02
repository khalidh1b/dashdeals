import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from '@/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import LoadingSkeleton from '@/components/common/skeletons/loading-skeleton.jsx';

// Initialize performance monitoring
// import { initializePerformanceMonitoring, scheduleIdleWork } from '@/shared/utils/performance-monitor';
// import { initializePreloading } from '@/shared/utils/component-preloader';
// import { initializeServiceWorker } from '@/shared/utils/service-worker';

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      suspense: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Lazy load AuthProvider to defer Firebase initialization
const AuthProvider = React.lazy(() => import('@/app/providers/auth-provider'));

// Initialize performance tools with delay to avoid blocking initial render
// const initializePerformanceTools = () => {
//   scheduleIdleWork(() => {
//     initializePerformanceMonitoring();
//     initializePreloading();
//     initializeServiceWorker();
//   }, { timeout: 1000 });
// };

// Initialize non-critical tools
// if(import.meta.env.VITE_PERFORMANCE_MONITOR === 'true') {
//   initializePerformanceTools();
// };

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <RouterProvider router={router} />
            </Suspense>
          </AuthProvider>
        </Suspense>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

// Use requestIdleCallback for better initial paint
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  }, { timeout: 100 });
} else {
  // Fallback for browsers without requestIdleCallback
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}
