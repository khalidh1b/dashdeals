import { STORAGE_KEYS } from './auth-constants.js';

export const tokenManager = {
  // get, set, remove access token and check if its exists
  set: (token) => {
    if (token) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
    }
  },

  get: () => {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  remove: () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  exists: () => {
    return !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }
};

export const handleAuthStateChange = async (currentUser, axiosPublic, queryClient) => {
  if (currentUser) {
    try {
      const userInfo = { email: currentUser.email };
      const response = await axiosPublic.post('/auth/jwt', userInfo);
      
      if (response?.data?.token) {
        tokenManager.set(response.data.token);
        // refetch cart data when user signs in
        queryClient.invalidateQueries({ queryKey: ['carts', currentUser.email] });
      } else {
        tokenManager.remove();
      }
    } catch (error) {
      console.error('jwt token error:', error);
      tokenManager.remove();
    }
  } else {
    // user is signed out, clear token and cart data
    tokenManager.remove();
    queryClient.setQueryData(['carts'], []);
  }
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return {
    isValid: password.length >= minLength,
    minLength: password.length >= minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar,
    strength: calculatePasswordStrength(password)
  };
};

const calculatePasswordStrength = (password) => {
  let score = 0;
  
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  
  return Math.min(score, 5);
};

// format auth error messages
export const formatAuthError = (error) => {
  const errorCode = error.code;
  
  switch (errorCode) {
    case 'auth/user-not-found':
      return 'no account found with this email address';
    case 'auth/wrong-password':
      return 'incorrect password';
    case 'auth/email-already-in-use':
      return 'an account with this email already exists';
    case 'auth/weak-password':
      return 'password should be at least 6 characters long';
    case 'auth/network-request-failed':
      return 'network error, please check your connection';
    case 'auth/too-many-requests':
      return 'too many failed attempts, please try again later';
    case 'auth/user-disabled':
      return 'this account has been disabled';
    case 'auth/operation-not-allowed':
      return 'this operation is not allowed';
    default:
      return error.message || 'an unexpected error occurred';
  }
};