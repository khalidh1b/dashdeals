let authInstance = null;
let googleAuthProviderInstance = null;
let authLoading = false;

// get firebase auth instance with lazy loading
export const getFirebaseAuth = async () => {
  if (authInstance) {
    return authInstance;
  }

  if (authLoading) {
    while (authLoading && !authInstance) {
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    return authInstance;
  }

  authLoading = true;

  try {
    // idle callback to avoid blocking main thread
    if ('requestIdleCallback' in window) {
      await new Promise((resolve) => {
        requestIdleCallback(resolve, { timeout: 3000 });
      });
    }

    const [{ getAuth }, { app }] = await Promise.all([
      import('firebase/auth'),
      import('@/app/config/firebase/firebase.config.js')
    ]);
    
    // reduce auth state checking frequency
    authInstance = getAuth(app, {
      persistence: 'local',
      phoneVerificationDisabled: true,
      tenantId: null,
    });
    
    authLoading = false;
    return authInstance;
  } catch (error) {
    console.error('firebase auth initialization error:', error);
    authLoading = false;
    throw error;
  }
};

// get google auth provider instance
export const getGoogleProvider = async () => {
  if (!googleAuthProviderInstance) {
    const { GoogleAuthProvider } = await import('firebase/auth');
    googleAuthProviderInstance = new GoogleAuthProvider();
    googleAuthProviderInstance.addScope('email');
    googleAuthProviderInstance.setCustomParameters({
      prompt: 'select_account'
    });
  }
  return googleAuthProviderInstance;
};