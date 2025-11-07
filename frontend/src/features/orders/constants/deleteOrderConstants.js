// Error types for better error handling
export const ERROR_TYPES = {
  NETWORK: "network",
  AUTHORIZATION: "authorization",
  NOT_FOUND: "not_found",
  SERVER: "server",
  UNKNOWN: "unknown"
};

// SweetAlert configuration constants
export const SWEET_ALERT_CONFIG = {
  CONFIRMATION: {
    title: "Are you sure?",
    text: "Do you want to delete this order!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  },
  SUCCESS: {
    icon: "success",
    title: "Order deleted successfully!",
    showConfirmButton: false,
    timer: 1500
  },
  ERROR: {
    icon: "error",
    title: "Failed to delete order",
    showConfirmButton: true
  }
};