// logs validation errors with production context
export const logvalidationerror = (operation, error, context = {}) => {
  console.error(`production validation error - ${operation}:`, {
    error,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    context
  });
};