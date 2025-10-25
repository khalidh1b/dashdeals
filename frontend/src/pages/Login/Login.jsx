import useSignIn from "@/features/auth/hooks/useSignIn";
import { useState } from "react";
import { AuthHeader } from "@/components/auth/common/auth-header.jsx";
import { AuthFooter } from "@/components/auth/common/auth-footer.jsx";
import { GoogleAuthButton } from "@/components/auth/common/google-auth-button.jsx";
import { AuthForm } from "@/components/auth/common/auth-form.jsx";
import { AuthBanner } from "@/components/auth/common/auth-banner";


const Login = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { handleSignIn, handleGoogleSignIn, googleLoading, loading } = useSignIn();

    const handleImageLoad = () => {
        setIsLoading(false);
    }

    return (
        <div className="md:flex items-center pb-32 md:pt-20 pt-7 md:mx-0 mx-8 gap-24">
            <AuthBanner
                isLoading={isLoading} 
                altText='Login Banner' 
                handleImageLoad={handleImageLoad}
            />

            <div>
                <AuthHeader
                    title="Login to Exclusive"
                    subtitle="Enter your details below"
                />
                <AuthForm
                    onSubmitFn={handleSignIn}
                    loading={loading}
                    submitText="Login"
                    fields={[
                        { name: 'email', type: 'email', classes: "focus:outline-none border-b-2 w-full pb-1 mb-7 border-x-0 border-t-0 dark:bg-[#09090B]", placeholder: 'Email' },
                        { name: 'password', type: 'password', classes: "border-b-2 focus:outline-none w-full  pb-1 border-x-0 border-t-0 dark:bg-[#09090B]", placeholder: 'Password' }
                    ]}
                    isLoginForm={true} 
                />
                <GoogleAuthButton
                    label="Sign In with Google"
                    loading={googleLoading}
                    onClickFn={handleGoogleSignIn} 
                />
                <AuthFooter
                    text="New to here go?"
                    linkText="Signup"
                    linkTo="/signup" 
                />
            </div>
        </div>
    );
};

export default Login;