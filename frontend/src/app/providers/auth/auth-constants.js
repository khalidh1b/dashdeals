// local storage keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'dashdeals-access-token',
  USER_PREFERENCES: 'dashdeals-user-preferences'
};

// auth loading states
export const AUTH_STATES = {
  INITIALIZING: 'initializing',
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  LOADING: 'loading'
};

// error messages
export const AUTH_ERRORS = {
  INVALID_CREDENTIALS: 'invalid email or password',
  USER_NOT_FOUND: 'user not found',
  EMAIL_ALREADY_IN_USE: 'email already in use',
  WEAK_PASSWORD: 'password should be at least 6 characters',
  NETWORK_ERROR: 'network error occurred',
  TOO_MANY_REQUESTS: 'too many requests, try again later'
};

// token configuration
export const TOKEN_CONFIG = {
  HEADER_PREFIX: 'Bearer ',
  EXPIRY_BUFFER: 5 * 60 * 1000,
  REFRESH_THRESHOLD: 15 * 60 * 1000 
};