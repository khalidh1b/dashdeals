import { Link } from "react-router-dom";

const LoginFooter = () => {
    return (
        <div className="flex justify-center gap-2 pt-8">
            <p className="poppins text-base font-normal text-[#000] dark:text-white">
                New to here go?
            </p>
            <Link 
                to="/signup" 
                className="text-[#000] dark:text-white text-base font-medium poppins">
                    Signup
            </Link>
        </div>
    );
};

export default LoginFooter;