import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Skeleton } from '@/Components/ui/skeleton';
import useSignUp from "../../hooks/useSignUp";

const Signup = () => {
    const [isLoading, setIsLoading] = useState(true);

    const { handleSignup, handleGoogleSignup, loading } = useSignUp();
    
    const handleImageLoad = () => {
        setIsLoading(false);
    }

    return (
        <div className="flex items-center pb-32 pt-20 gap-24">
            {
                isLoading && <><Skeleton className="w-1/2 h-screen" /></>
            } 
            <div className={`bg-[#CBE4E8] pt-10 w-1/2 ${isLoading ? 'hidden' : ''}`}>
                <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729422686/authentication-banner_i6gqed.png" alt="signup-banner" onLoad={handleImageLoad}/>
            </div>
            <div>
                <h3 className="text-[#000] dark:text-white text-[36px] font-medium">Create an account</h3>
                <h5 className="text-[#000] dark:text-white poppins text-base font-normal pb-10">Enter your details below</h5>
                <form onSubmit={handleSignup}>
                    <input className="border-b-[1px] w-full border-[#000000] dark:bg-[#09090B] dark:border-b-2 dark:border-b-gray-400 pb-1 mb-7 border-x-0 border-t-0 focus:outline-none" type="text" name="name" id="" placeholder="Name"/> <br />
                    <input className="focus:outline-none border-b-2 w-full pb-1 mb-7 border-x-0 border-t-0 dark:bg-[#09090B] dark:border-b-2 dark:border-b-gray-400" type="email" name="email" id="" placeholder="Email or Phone Number" required/> <br />
                    <input className="border-b-2 focus:outline-none w-full  mb-8 pb-1 border-x-0 border-t-0 dark:bg-[#09090B] dark:border-b-2 dark:border-b-gray-400" type="password" name="password" id="" placeholder="Password" required/> <br />
                    <button disabled={loading ? true : false} className="text-white bg-[#DB4444] rounded py-3 w-full flex justify-center gap-2" type="submit">Create Account {loading &&<span className="loading loading-spinner loading-md"></span>}</button>
                </form>
                <div onClick={handleGoogleSignup} className="flex items-center gap-2 justify-center py-3 w-full mt-4 rounded text-[#000] dark:text-white poppins text-base font-normal cursor-pointer border-2"><FcGoogle className="text-2xl"/><span>Sign Up with Google</span></div>
                <div className="flex justify-center gap-2 pt-8"><p className="poppins text-base font-normal text-[#000] dark:text-white">Already have an account</p><Link to="/login" className="text-[#000] dark:text-white text-base font-medium poppins">Login</Link></div>
            </div>
        </div>
    );
};

export default Signup;