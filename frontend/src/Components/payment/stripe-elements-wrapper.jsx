import React, { useState, useEffect, Suspense } from 'react';
import { Elements } from '@stripe/react-stripe-js';

let stripePromise = null;
let stripeLoading = false;

const loadStripeOptimized = async () => {
  if (stripePromise) {
    //console.log('Returning cached stripePromise.');
    return stripePromise;
  }

  if (stripeLoading) {
    //console.log('Stripe is already loading, waiting for it to complete.');
    while (stripeLoading) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    return stripePromise;
  }

  stripeLoading = true;
  
  try {
    const { loadStripe } = await import('@stripe/stripe-js');
    
    stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK, {
      betas: [],
      __stripeJsRef: null,
      stripeAccount: null,
    });
    
    stripeLoading = false;
    //console.log('Stripe loaded successfully. stripePromise:', stripePromise);
    return stripePromise;
  } catch (error) {
    console.error('Failed to load Stripe:', error);
    stripeLoading = false;
    stripePromise = null;
    return null;
  }
};

// Loading component for Stripe
const StripeLoadingFallback = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-sm text-gray-600">Loading secure payment...</span>
  </div>
);

const StripeElementsWrapper = ({ children }) => {
  const [stripe, setStripe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    const initializeStripe = async () => {
      try {
        // Load Stripe with idle callback to avoid blocking main thread
        if ('requestIdleCallback' in window) {
          await new Promise((resolve) => {
            requestIdleCallback(resolve, { timeout: 2000 });
          });
        }
        
        const stripeInstance = await loadStripeOptimized();
        
        if (mounted) {
          setStripe(stripeInstance);
          setLoading(false);
        }
      } catch (err) {
        if (mounted) {
          setError(err);
          setLoading(false);
          console.error("Stripe initialization error:", err);
        }
      }
    };

    // Defer Stripe initialization if not on payment page
    const isPaymentPage = window.location.pathname.includes('/checkout') || 
                          window.location.pathname.includes('/payment');
    
    if (isPaymentPage) {
      initializeStripe();
    } else {
      const timer = setTimeout(initializeStripe, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      mounted = false;
    };
  }, [error]);

  if (loading) {
    return <StripeLoadingFallback />;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 text-sm">
        Unable to load payment system. Please refresh the page.
      </div>
    );
  }

  if (!stripe) {
    return (
      <div className="p-4 text-gray-600 text-sm">
        Payment system is initializing...
      </div>
    );
  }

  return (
    <Suspense fallback={<StripeLoadingFallback />}>
      <Elements stripe={stripe}>
        {children}
      </Elements>
    </Suspense>
  );
};

// Preload Stripe utility for better UX
export const preloadStripe = () => {
  if (!stripePromise && !stripeLoading) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        loadStripeOptimized();
      }, { timeout: 5000 });
    } else {
      setTimeout(() => {
        loadStripeOptimized();
      }, 2000);
    }
  }
};

export default StripeElementsWrapper;