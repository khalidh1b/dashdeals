// Deletes an order via API
export const deleteOrderFromAPI = async (axiosSecure, orderId) => {
  if (!orderId) {
    throw new Error("Order ID is required");
  }

  const response = await axiosSecure.delete(`/users/deleteOrder/${orderId}`);
  
  // Check if deletion was successful
  if (response.status === 200 || response.data?.success) {
    return { success: true, data: response.data };
  } else {
    throw new Error(response.data?.message || "Failed to delete order");
  }
};

// Validates the order ID before making API calls
export const validateOrderId = (orderId) => {
  if (!orderId) {
    throw new Error("Order ID is required");
  }
  
  if (typeof orderId !== 'string' && typeof orderId !== 'number') {
    throw new Error("Order ID must be a string or number");
  }
  
  return true;
};