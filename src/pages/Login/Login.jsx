import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Skeleton } from '@/Components/ui/skeleton';
import useSignIn from "../../hooks/useSignIn";
import { Link } from "react-router-dom";
import useForgetPass from "../../hooks/useForgetPass";
import PassResetForm from "../../Components/PassResetForm/PassResetForm";

const Login = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { handleSignIn, handleGoogleSignIn, loading } = useSignIn();
    const { handleForgetPass } = useForgetPass();
    
    const handleImageLoad = () => {
        setIsLoading(false);
    }

    return (
        <div className="flex items-center pb-32 pt-20 gap-24">
            {
                isLoading && <><Skeleton className="w-1/2 h-screen" /></>
            } 
            <div className={`bg-[#CBE4E8] pt-10 w-1/2 ${isLoading ? 'hidden' : ''}`}>
                <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729422686/authentication-banner_i6gqed.png" alt="login-banner" onLoad={handleImageLoad}/>
            </div>
            <div>
                <h3 className="text-[#000] dark:text-white text-[36px] font-medium">Log in to Exclusive</h3>
                <h5 className="text-[#000] dark:text-white poppins text-base font-normal pb-10">Enter your details below</h5>
                <form onSubmit={handleSignIn}>
                    <input className="focus:outline-none border-b-2 w-full pb-1 mb-7 border-x-0 border-t-0 dark:bg-[#09090B]" type="email" name="email" id="" placeholder="Email or Phone Number"/> <br />
                    <input className="border-b-2 focus:outline-none w-full  pb-1 border-x-0 border-t-0 dark:bg-[#09090B]" type="password" name="password" id="" placeholder="Password"/>
                    <PassResetForm handleForgetPass={handleForgetPass}/>
                    <br />
                    <button disabled={loading ? true : false} className="text-white bg-[#DB4444] rounded py-3 w-full flex justify-center gap-2" type="submit">Login{loading && <span className="loading loading-spinner loading-md"></span>}</button>
                </form>
                <div onClick={handleGoogleSignIn} className="flex items-center gap-2 justify-center py-3 w-full mt-4 rounded text-[#000] dark:text-white poppins text-base font-normal cursor-pointer border-2"><FcGoogle className="text-2xl"/><span>Sign In with Google</span></div>
                <div className="flex justify-center gap-2 pt-8"><p className="poppins text-base font-normal text-[#000] dark:text-white">New to here go?</p><Link to="/signup" className="text-[#000] dark:text-white text-base font-medium poppins">Signup</Link></div>
            </div>
        </div>
    );
};

export default Login;