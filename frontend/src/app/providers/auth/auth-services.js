import { getFirebaseAuth, getGoogleProvider } from './firebase-auth.js';

// create new user with email and password
export const createUser = async (email, password) => {
  const auth = await getFirebaseAuth();
  const { createUserWithEmailAndPassword } = await import('firebase/auth');
  return createUserWithEmailAndPassword(auth, email, password);
};

// sign in existing user with email and password
export const signIn = async (email, password) => {
  const auth = await getFirebaseAuth();
  const { signInWithEmailAndPassword } = await import('firebase/auth');
  return signInWithEmailAndPassword(auth, email, password);
};

// sign in with google popup
export const googleSignIn = async () => {
  const auth = await getFirebaseAuth();
  const { signInWithPopup } = await import('firebase/auth');
  const googleProvider = await getGoogleProvider();
  return signInWithPopup(auth, googleProvider);
};

// sign out current user
export const logOut = async () => {
  const auth = await getFirebaseAuth();
  const { signOut } = await import('firebase/auth');
  return signOut(auth)
    .then(() => {
      console.log('user signed out successfully');
    })
    .catch((error) => {
      console.error('sign out error:', error);
    });
};

// update user profile information
export const profileUpdate = async (name) => {
  const auth = await getFirebaseAuth();
  const { updateProfile } = await import('firebase/auth');
  return updateProfile(auth.currentUser, {
    displayName: name
  });
};

// send password reset email
export const forgetPassword = async (email) => {
  const auth = await getFirebaseAuth();
  const { sendPasswordResetEmail } = await import('firebase/auth');
  return sendPasswordResetEmail(auth, email);
};

// listen to auth state changes
export const onAuthStateChange = (callback) => {
  const setupAuthListener = async () => {
    try {
      const auth = await getFirebaseAuth();
      const { onAuthStateChanged } = await import('firebase/auth');
      return onAuthStateChanged(auth, callback);
    } catch (error) {
      console.error('auth listener setup error:', error);
      throw error;
    }
  };
  
  return setupAuthListener();
};