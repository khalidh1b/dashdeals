import { useState } from "react";
import { Skeleton } from '@/components/ui/skeleton';
import LoginHeader from "@/components/auth/login/LoginHeader.jsx";
import LoginForm from "@/components/auth/login/LoginForm.jsx";
import GoogleLogin from "@/components/auth/login/GoogleLogin.jsx";
import LoginFooter from "@/components/auth/login/LoginFooter.jsx";

const Login = () => {
    const [isLoading, setIsLoading] = useState(true);

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
                <LoginForm/>
                <GoogleLogin/>
                <LoginFooter/>
            </div>
        </div>
    );
};

export default Login;