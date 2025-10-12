import { FcGoogle } from "react-icons/fc";
import PropTypes from 'prop-types';
import { Loader2 } from "lucide-react";

export const GoogleAuthButton = ({ label, loading, onClickFn }) => {
    
    return (
        <button 
            onClick={onClickFn} 
            className={`google-auth-button poppins ${loading && 'pointer-events-none' }`}
        >
            <span className="flex items-center gap-5">
                    {loading 
                        ? <Loader2 className="animate-spin"/> 
                        : <><FcGoogle className="text-2xl"/>{label}</>
                    }
            </span>
        </button>
    );
};

GoogleAuthButton.propTypes = {
    handleGoogleSignIn: PropTypes.func,
    loading: PropTypes.bool
};