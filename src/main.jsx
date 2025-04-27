import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from './Routes/Router';
import AuthProvider from './providers/AuthProvider';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const queryClient = new QueryClient();

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_PK);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
                <Elements stripe={stripePromise}>                  
                  <RouterProvider router={router} />
                </Elements>
          </QueryClientProvider>
        </AuthProvider>
  </React.StrictMode>,
)
