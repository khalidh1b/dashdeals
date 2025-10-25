import { useContext, useCallback } from "react";
import { AuthContext } from "@/app/providers/auth-provider";
import { VALIDATION, SWEET_ALERT_CONFIG } from '@/features/auth/constants/email-validation';
import { validateEmail, showErrorAlert, showSuccessAlert } from '@/features/auth/utils/validation-and-alerts';

const useForgetPass = () => {
  const { forgetPassword } = useContext(AuthContext);

  const handleForgetPass = useCallback(async (email) => {

    if (!email || !validateEmail(email)) {
      return showErrorAlert(VALIDATION.ERROR_MESSAGES.INVALID_EMAIL);
    }

    try {
      await forgetPassword(email);
      showSuccessAlert(VALIDATION.SUCCESS_MESSAGES.EMAIL_SENT);
      return { success: true };
    } catch (error) {
      console.error("Password reset error:", error);
      const errorMessage = error.message || VALIDATION.ERROR_MESSAGES.GENERIC_ERROR;
      showErrorAlert(errorMessage, SWEET_ALERT_CONFIG.ERROR_WITH_CONFIRM);
      return { success: false, error: errorMessage };
    }
  }, [forgetPassword]);

  return { handleForgetPass };
};

export default useForgetPass;