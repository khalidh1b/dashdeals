import Swal from "sweetalert2";
import { VALIDATION, SWEET_ALERT_CONFIG } from '@/features/auth/constants/email-validation';

export const validateEmail = (email) => {
  return VALIDATION.EMAIL_REGEX.test(email);
};

export const showErrorAlert = (title, config = SWEET_ALERT_CONFIG.ERROR) => {
  return Swal.fire({
    ...config,
    title,
  });
};

export const showSuccessAlert = (title) => {
  return Swal.fire({
    ...SWEET_ALERT_CONFIG.SUCCESS,
    title,
  });
};