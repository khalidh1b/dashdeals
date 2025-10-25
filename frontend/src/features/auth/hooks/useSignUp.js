import { useContext, useState } from "react";
import { AuthContext } from "@/app/providers/auth-provider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from '@/shared/hooks/useAxiosSecure';

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
            const result = await createUser(data.email, data.password)
            console.log('signup result', result);

            if(result.user.email) {
                Swal.fire({
                    icon: "success",
                    title: "User successfully signed up!",
                    showConfirmButton: false,
                    timer: 2000
                });
                
                await logOut()
                await navigate('/login');
            }
            
            const profileupdate = await profileUpdate(name);

            const savedata = await axiosSecure.post('/users/saveuser', data)
            console.log('savedata', savedata);
            
        } catch (error) {
            console.error('error in signup',error)
            Swal.fire({
                icon: "error",
                title: `${error.message}`,
                showConfirmButton: false,
                timer: 3000
            });
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        let data;
        try {
            setGoogleLoading(true);
            
            const result = await googleSignIn();
            data = {
                name: result.user?.displayName, 
                email: result.user?.email,
                profilePic: result.user?.photoURL
            };

            if(result.user) {
                await navigate('/');
                Swal.fire({
                    icon: "success",
                    title: "Login successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
            };
            
            const user = await axiosSecure.post('/users/saveuser', data)
                
            } catch (error) {
                console.error('error in google auth');
                Swal.fire({
                    icon: "error",
                    title: `${error.message}`,
                    showConfirmButton: false,
                    timer: 2500
                });
            } finally {
                setGoogleLoading(false);
            }
        };
        
        return { handleSignup, handleGoogleSignup, loading, googleLoading };
    };
    
    export default useSignUp;