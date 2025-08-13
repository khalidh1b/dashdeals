import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from '../hooks/useAxiosSecure';

const useSignUp = () => {
    const { createUser, logOut, googleSignIn, profileUpdate } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const axiosSecure = useAxiosSecure();

    const handleSignup = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const data = {name, email, password};
        console.log(data);

        try {
            setLoading(true);
            await createUser(data.email, data.password)
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
            })
            
            //update profile
            await profileUpdate(name);

            //save user to db
            await axiosSecure.post('/users/saveuser', data)
            .then((res) => {
                console.log(res);
            })
        } catch (error) {
            console.error('error in signup',error)
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        let data;
        try {
            setGoogleLoading(true);
            await googleSignIn()
            .then((result) => {
                console.log(result);
                data = {
                    name: result.user?.displayName, 
                    email: result.user?.email,
                    profilePic: result.user?.photoURL
                }
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
            await axiosSecure.post('/users/saveuser', data)
            .catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.error('error in google auth')
        } finally {
            setGoogleLoading(false);
        }
    };

    return { handleSignup, handleGoogleSignup, loading, googleLoading };
};

export default useSignUp;