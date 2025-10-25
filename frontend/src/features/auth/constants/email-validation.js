export const VALIDATION = {
  EMAIL_REGEX: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  ERROR_MESSAGES: {
    INVALID_EMAIL: "Please enter a valid email address",
    GENERIC_ERROR: "An error occurred. Please try again.",
  },
  SUCCESS_MESSAGES: {
    EMAIL_SENT: "Password reset email sent successfully! Please check your inbox or spam folder",
  },
};

export const SWEET_ALERT_CONFIG = {
  ERROR: {
    icon: "error",
    showConfirmButton: false,
    timer: 1500,
  },
  SUCCESS: {
    icon: "success",
    showConfirmButton: true,
  },
  ERROR_WITH_CONFIRM: {
    icon: "error",
    showConfirmButton: true,
  },
};