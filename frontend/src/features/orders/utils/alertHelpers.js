import Swal from "sweetalert2";
import { SWEET_ALERT_CONFIG } from "../constants/deleteOrderConstants";

// Shows a confirmation dialog for order deletion
export const showDeleteConfirmation = () => {
  return Swal.fire(SWEET_ALERT_CONFIG.CONFIRMATION);
};

// Shows a success message after order deletion
export const showDeleteSuccess = () => {
  return Swal.fire(SWEET_ALERT_CONFIG.SUCCESS);
};

// Shows an error message when order deletion fails
export const showDeleteError = (errorMessage) => {
  return Swal.fire({
    ...SWEET_ALERT_CONFIG.ERROR,
    text: errorMessage
  });
};