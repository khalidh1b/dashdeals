import { useState, useCallback } from "react";
import useAxiosSecure from "@/shared/hooks/useAxiosSecure";
import { useQueryClient } from "@tanstack/react-query";

// Import separated utilities
import { showDeleteConfirmation, showDeleteSuccess, showDeleteError } from "../utils/alertHelpers";
import { getErrorMessage, logError } from "../utils/errorHandlers";
import { deleteOrderFromAPI, validateOrderId } from "../services/orderService";

// Custom hook for handling order deletion functionality
const useDeleteOrder = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Deletes an order after user confirmation
  const deleteOrder = useCallback(async (orderId) => {
    try {
      validateOrderId(orderId);
      
      setIsLoading(true);
      setError(null);

      const { isConfirmed } = await showDeleteConfirmation();

      if (!isConfirmed) {
        return { success: false, cancelled: true };
      }

      // Perform deletion via service layer
      const result = await deleteOrderFromAPI(axiosSecure, orderId);
      
      // Invalidate and refetch orders query for immediate UI update,
      await queryClient.invalidateQueries({ queryKey: ["userOrders"] });
      
      await showDeleteSuccess();
      
      return { success: true, data: result.data };
      
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      
      await showDeleteError(errorMessage);
      
      // Log error for debugging
      logError(orderId, err);
      
      return { 
        success: false, 
        error: errorMessage,
        cancelled: false 
      };
    } finally {
      setIsLoading(false);
    }
  }, [axiosSecure, queryClient]);

  // Cleanup error state
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    deleteOrder,
    isLoading,
    error,
    clearError
  };
};

export default useDeleteOrder;