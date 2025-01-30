import { FcGoogle } from "react-icons/fc";
import PropTypes from 'prop-types';

const GoogleSignup = ({ handleGoogleSignup }) => {
    return (
        <div onClick={handleGoogleSignup} className="flex items-center gap-2 justify-center py-3 w-full mt-4 rounded text-[#000] dark:text-white poppins text-base font-normal cursor-pointer border-2"><FcGoogle className="text-2xl"/><span>Sign Up with Google</span></div>
    );
};

GoogleSignup.propTypes = {
    handleGoogleSignup: PropTypes.func,
}

export default GoogleSignup;