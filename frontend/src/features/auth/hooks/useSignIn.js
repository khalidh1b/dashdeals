import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/app/providers/auth-provider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

const useSignIn = () => {
    const { user, signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

    const handleSignIn = async (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const data = {email, password};
        
        try {
            setLoading(true);
            
            const result = await signIn(data.email, data.password);
            //console.log(result);

            if(result.user.email) {
                await navigate('/');
                Swal.fire({
                    icon: "success",
                    title: "Login successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 2000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            setGoogleLoading(true);
            const result = await googleSignIn()
            //console.log(result.user);
            
            if(result.user) {
                await navigate('/');
                Swal.fire({
                    icon: "success",
                    title: "Login successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 2000
            });
        } finally {
            setGoogleLoading(false);
        }
    }

    return { handleSignIn, handleGoogleSignIn, loading, googleLoading };
};

export default useSignIn;