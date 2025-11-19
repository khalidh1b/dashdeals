export { getFirebaseAuth, getGoogleProvider } from './firebase-auth.js';

// auth service functions
export {
  createUser,
  signIn,
  googleSignIn,
  logOut,
  profileUpdate,
  forgetPassword,
  onAuthStateChange
} from './auth-services.js';

// auth utilities
export {
  tokenManager,
  handleAuthStateChange,
  isValidEmail,
  validatePassword,
  formatAuthError
} from './auth-utils.js';

export {
  STORAGE_KEYS,
  AUTH_STATES,
  AUTH_ERRORS,
  TOKEN_CONFIG
} from './auth-constants.js';