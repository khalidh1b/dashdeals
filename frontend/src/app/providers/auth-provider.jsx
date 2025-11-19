import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosPublic from '@/shared/hooks//useAxiosPublic.js';
import { useQueryClient } from '@tanstack/react-query';

import { onAuthStateChange } from './auth/auth-services.js';
import { handleAuthStateChange } from './auth/auth-utils.js';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);
  
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  // initialize firebase auth and set up auth state listener
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const unsubscribe = await onAuthStateChange(async (currentUser) => {
          setUser(currentUser);
          
          // handle authentication state changes
          await handleAuthStateChange(currentUser, axiosPublic, queryClient);
          
          setLoading(false);
          setAuthInitialized(true);
        });

        // cleanup function
        return () => {
          if (unsubscribe) {
            unsubscribe();
          }
        };
      } catch (error) {
        console.error('auth initialization error:', error);
        setLoading(false);
        setAuthInitialized(true);
      }
    };

    initializeAuth();
  }, [axiosPublic, queryClient]);

  const authMethods = {
    // create new user account
    createUser: async (email, password) => {
      const { createUser } = await import('./auth/auth-services.js');
      return createUser(email, password);
    },

    // sign in with email and password
    signIn: async (email, password) => {
      const { signIn } = await import('./auth/auth-services.js');
      return signIn(email, password);
    },

    // sign in with google
    googleSignIn: async () => {
      const { googleSignIn } = await import('./auth/auth-services.js');
      return googleSignIn();
    },

    // sign out current user
    logOut: async () => {
      const { logOut } = await import('./auth/auth-services.js');
      return logOut();
    },

    // update user profile
    profileUpdate: async (name) => {
      const { profileUpdate } = await import('./auth/auth-services.js');
      return profileUpdate(name);
    },

    // send password reset email
    forgetPassword: async (email) => {
      const { forgetPassword } = await import('./auth/auth-services.js');
      return forgetPassword(email);
    }
  };

  const authInfo = {
    user,
    loading: loading || !authInitialized,    
    ...authMethods
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;