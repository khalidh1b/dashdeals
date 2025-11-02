import useSignUp from "@/features/auth/hooks/useSignUp.js";
import { AuthHeader } from "@/component/auth/common/auth-header.jsx";
import { AuthFooter } from "@/component/auth/common/auth-footer.jsx";
import { GoogleAuthButton } from "@/component/auth/common/google-auth-button.jsx";
import { AuthForm } from "@/component/auth/common/auth-form.jsx";
import { AuthBanner } from "@/component/auth/common/auth-banner";

const Signup = () => {

    const { 
        handleSignup, 
        handleGoogleSignup, 
        loading, 
        googleLoading 
    } = useSignUp();

    return (
        <div className="md:flex items-center pb-32 md:pt-20 pt-6 md:mx-0 mx-8 gap-24">
            <AuthBanner 
                altText='Signup Banner' 
            />

            <div>
                <AuthHeader
                    title="Create an account"
                    subtitle="Enter your details below"
                />
                <AuthForm
                    onSubmitFn={handleSignup}
                    loading={loading}
                    submitText="Create Account"
                    fields={[
                        { name: 'name', type: 'text', classes: "border-b w-full border-[#000000] dark:bg-[#09090B] dark:border-b-2 dark:border-b-gray-400 pb-1 mb-7 border-x-0 border-t-0 focus:outline-none", placeholder: 'Name' },
                        { name: 'email', type: 'email', classes: "border-b w-full border-[#000000] dark:bg-[#09090B] dark:border-b-2 dark:border-b-gray-400 pb-1 mb-7 border-x-0 border-t-0 focus:outline-none", placeholder: 'Email' },
                        { name: 'password', type: 'password', classes: "border-b w-full border-[#000000] dark:bg-[#09090B] dark:border-b-2 dark:border-b-gray-400 pb-1 mb-7 border-x-0 border-t-0 focus:outline-none", placeholder: 'Password' }
                    ]} 
                />
                <GoogleAuthButton
                    label="Sign up with Google"
                    loading={googleLoading}
                    onClickFn={handleGoogleSignup} 
                />
                <AuthFooter
                    text="Already have an account?"
                    linkText="Login"
                    linkTo="/login" 
                />
            </div>
        </div>
    );
};

export default Signup;