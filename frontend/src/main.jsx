import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router-dom";
import router from '@/router/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoadingSkeleton } from '@/components/common/skeletons/loading-skeleton';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000, 
      retry: 1,
      refetchOnWindowFocus: false,
      suspense: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Lazy load providers to defer initialization
const AuthProvider = React.lazy(() => import('@/app/providers/auth-provider'));
const ThemeProvider = React.lazy(() => import('@/app/providers/theme-provider'));
const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSkeleton/>}>
          <ThemeProvider>
            <Suspense fallback={<LoadingSkeleton />}>
              <AuthProvider>
                <Suspense fallback={<LoadingSkeleton />}>
                  <RouterProvider router={router} />
                </Suspense>
              </AuthProvider>
            </Suspense>
          </ThemeProvider>
        </Suspense>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);