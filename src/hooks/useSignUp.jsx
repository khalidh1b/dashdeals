import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
    const { createUser, logOut, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const data = {name, email, password};
        console.log(data);

        setLoading(true);
        //creating user via email and password
        createUser(data.email, data.password)
        .then((result) => {
            console.log(result.user);
            console.log(result.user.email);
            if(result.user.email) {
                Swal.fire({
                    icon: "success",
                    title: "User successfully signed up!",
                    showConfirmButton: false,
                    timer: 2000
                });

                logOut()
                navigate('/login');
            }
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    const handleGoogleSignup = () => {
        googleSignIn()
        .then((result) => {
            console.log(result);
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
        .catch((error) => {
            console.log(error);
        })
    };

    return { handleSignup, handleGoogleSignup, loading };
};

export default useSignUp;