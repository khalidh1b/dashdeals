import { useState } from "react";
import { Skeleton } from '@/Components/ui/skeleton';
import useSignUp from "../../hooks/useSignUp.js";
import SignupForm from "../../Components/Signup/SignupForm.jsx";
import GoogleSignup from "../../Components/Signup/GoogleSignup.jsx";
import SignupFooter from "../../Components/Signup/SignupFooter.jsx";
import SignupHeader from "../../Components/Signup/SignupHeader.jsx";

const Signup = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { handleSignup, handleGoogleSignup, loading, googleLoading } = useSignUp();
    
    const handleImageLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="md:flex items-center pb-32 md:pt-20 pt-6 md:mx-0 mx-8 gap-24">
            {
                isLoading && <><Skeleton className="w-1/2 h-screen" /></>
            } 
            <div className={`bg-[#CBE4E8] md:block hidden pt-10 w-1/2 ${isLoading ? 'hidden' : ''}`}>
                <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729422686/authentication-banner_i6gqed.png" alt="signup-banner" onLoad={handleImageLoad}/>
            </div>

            <div>
                <SignupHeader/>
                <SignupForm handleSignup={handleSignup} loading={loading}/>
                <GoogleSignup handleGoogleSignup={handleGoogleSignup} loading={googleLoading}/>
                <SignupFooter/>
            </div>
        </div>
    );
};

export default Signup;