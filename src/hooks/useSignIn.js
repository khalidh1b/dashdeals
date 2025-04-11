import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useSignIn = () => {
    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // Email Sign In
    const handleSignIn = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const data = {email, password};
        console.log(data);

        setLoading(true);
        signIn(data.email, data.password)
        .then((result) => {
            console.log(result);
            if(result.user.email) {
                Swal.fire({
                    icon: "success",
                    title: "Login successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/');
            }
            setLoading(false);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 2000
            });
        })
    }

    // Google Sign In
    const handleGoogleSignIn = async () => {
        try {
            setGoogleLoading(true);
            googleSignIn()
            .then((result) => {
                console.log(result.user);
                if(result.user) {
                    navigate('/');
                    Swal.fire({
                        icon: "success",
                        title: "Login successful!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
        } catch (error) {
            console.log(error);
        } finally {
            setGoogleLoading(false);
        }
    }

    return { handleSignIn, handleGoogleSignIn, loading, googleLoading };
};

export default useSignIn;