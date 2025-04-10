import { FcGoogle } from "react-icons/fc";
import PropTypes from 'prop-types';
import { Loader2 } from 'lucide-react';

const GoogleSignup = ({ handleGoogleSignup, loading }) => {
    return (
        <div 
            onClick={handleGoogleSignup} 
            className="flex items-center gap-2 justify-center py-3 w-full mt-4 rounded text-[#000] dark:text-white poppins text-base font-normal cursor-pointer border-2">
                <span className="flex items-center gap-5">
                    {loading 
                        ? <Loader2 className="animate-spin"/> 
                        : <><FcGoogle className="text-2xl"/>
                            Sign In with Google</>
                    }
                </span>
        </div>
    );
};

GoogleSignup.propTypes = {
    handleGoogleSignup: PropTypes.func,
}

export default GoogleSignup;