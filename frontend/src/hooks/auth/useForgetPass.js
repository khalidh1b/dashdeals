import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "@/providers/auth-provider";

const useForgetPass = () => {
    const { forgetPassword } = useContext(AuthContext);

    const handleForgetPass = async () => {
        let email = document.getElementById("reset-email").value;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)) {
            return Swal.fire({
                icon: "error",
                title: "Enter a valid email address",
                showConfirmButton: false,
                timer: 1500
            });
        } 

        try {
            await forgetPassword(email)
            Swal.fire({
                icon: "success",
                title: "Password reset email sent successfully! Please check your inbox or spam folder",
                showConfirmButton: true,
            });
            const escKeyEvent = new KeyboardEvent("keydown", { key: "Escape",  code: "Escape",  keyCode: 27,  bubbles: true, cancelable: true });
            document.dispatchEvent(escKeyEvent);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: true,
            });
        }
    };

    return { handleForgetPass };
};

export default useForgetPass;