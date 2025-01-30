import { useState } from "react";
import { Skeleton } from '@/Components/ui/skeleton';
import useSignIn from "../../hooks/useSignIn.js";
import useForgetPass from "../../hooks/useForgetPass.js";
import LoginHeader from "../../Components/Login/LoginHeader.jsx";
import LoginForm from "../../Components/Login/LoginForm.jsx";
import GoogleLogin from "../../Components/Login/GoogleLogin.jsx";
import LoginFooter from "../../Components/Login/LoginFooter.jsx";

const Login = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { handleSignIn, handleGoogleSignIn, loading } = useSignIn();
    const { handleForgetPass } = useForgetPass();
    
    const handleImageLoad = () => {
        setIsLoading(false);
    }

    return (
        <div className="md:flex items-center pb-32 md:pt-20 pt-7 md:mx-0 mx-8 gap-24">
            {
                isLoading && <><Skeleton className="w-1/2 h-screen" /></>
            } 
            <div className={`bg-[#CBE4E8] md:block hidden pt-10 w-1/2 ${isLoading ? 'hidden' : ''}`}>
                <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729422686/authentication-banner_i6gqed.png" alt="login-banner" onLoad={handleImageLoad}/>
            </div>
            <div>
                <LoginHeader/>
                <LoginForm handleSignIn={handleSignIn} handleForgetPass={handleForgetPass} loading={loading}/>
                <GoogleLogin handleGoogleSignIn={handleGoogleSignIn}/>
                <LoginFooter/>
            </div>
        </div>
    );
};

export default Login;