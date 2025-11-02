import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useAxiosPublic from '@/shared/hooks//useAxiosPublic.js';

export const AuthContext = createContext(null);

// Lazy load Firebase auth with optimization
let authInstance = null;
let GoogleAuthProviderInstance = null;
let authLoading = false;

const getFirebaseAuth = async () => {
  if (authInstance) {
    return authInstance;
  }

  if (authLoading) {
    // Wait for existing initialization
    while (authLoading && !authInstance) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    return authInstance;
  }

  authLoading = true;

  try {
    // Use idle callback to avoid blocking main thread
    if ('requestIdleCallback' in window) {
      await new Promise((resolve) => {
        requestIdleCallback(resolve, { timeout: 3000 });
      });
    }

    const [{ getAuth }, { app }] = await Promise.all([
      import('firebase/auth'),
      import('@/app/config/firebase/firebase.config.js')
    ]);
    
    authInstance = getAuth(app, {
      // Optimize auth performance
      persistence: 'local',
      // Disable unnecessary features for faster init
      phoneVerificationDisabled: true,
      // Reduce auth state checking frequency
      tenantId: null,
    });
    
    authLoading = false;
    return authInstance;
  } catch (error) {
    console.error('Firebase Auth initialization error:', error);
    authLoading = false;
    throw error;
  }
};

const getGoogleProvider = async () => {
  if (!GoogleAuthProviderInstance) {
    const { GoogleAuthProvider } = await import('firebase/auth');
    GoogleAuthProviderInstance = new GoogleAuthProvider();
    // Configure provider for better performance
    GoogleAuthProviderInstance.addScope('email');
    GoogleAuthProviderInstance.setCustomParameters({
      prompt: 'select_account'
    });
  }
  return GoogleAuthProviderInstance;
};

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authInitialized, setAuthInitialized] = useState(false);
    const axiosPublic = useAxiosPublic();

    // Initialize Firebase auth
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const auth = await getFirebaseAuth();
                const { onAuthStateChanged } = await import('firebase/auth');
                
                const onSubscribe = onAuthStateChanged(auth, async (currentUser) => {
                    setUser(currentUser);
                    
                    if(currentUser) {
                        try {
                            const userInfo = {email: currentUser.email};
                            const res = await axiosPublic.post('/auth/jwt', userInfo)
                            
                            if(res?.data?.token) {
                                localStorage.setItem('dashdeals-access-token', res?.data?.token);
                            } else {
                                localStorage.removeItem('dashdeals-access-token');
                            }
                        } catch (error) {
                            console.error('Jwt error:', error);
                        }
                    } else {
                        localStorage.removeItem('dashdeals-access-token');
                    }

                    setLoading(false);
                    setAuthInitialized(true);
                });

                return () => {
                    onSubscribe();
                };
            } catch (error) {
                console.error('Auth initialization error:', error);
                setLoading(false);
                setAuthInitialized(true);
            }
        };

        initializeAuth();
    }, [axiosPublic]);

    //creating new user
    const createUser = async (email, password) => {
        const auth = await getFirebaseAuth();
        const { createUserWithEmailAndPassword } = await import('firebase/auth');
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const profileUpdate = async (name) => {
        const auth = await getFirebaseAuth();
        const { updateProfile } = await import('firebase/auth');
        return updateProfile(auth.currentUser, {
            displayName: name
        });
    };

    //sign in existing user
    const signIn = async (email, password) => {
        const auth = await getFirebaseAuth();
        const { signInWithEmailAndPassword } = await import('firebase/auth');
        return signInWithEmailAndPassword(auth, email, password);
    }

    //sign in with google popup
    const googleSignIn = async () => {
        const auth = await getFirebaseAuth();
        const { signInWithPopup } = await import('firebase/auth');
        const googleProvider = await getGoogleProvider();
        return signInWithPopup(auth, googleProvider);
    }

    //user logOut
    const logOut = async () => {
        const auth = await getFirebaseAuth();
        const { signOut } = await import('firebase/auth');
        return signOut(auth)
        .then(() => {
            //console.log(result);
        })
        .catch(() => {
            //console.log(error);
        })
    }

    //forget password
    const forgetPassword = async (email) => {
        const auth = await getFirebaseAuth();
        const { sendPasswordResetEmail } = await import('firebase/auth');
        return sendPasswordResetEmail(auth, email);
    }

    const authInfo = {
        createUser,
        googleSignIn,
        user,
        signIn,
        forgetPassword,
        logOut,
        profileUpdate,
        loading: loading || !authInitialized
    }
    
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
