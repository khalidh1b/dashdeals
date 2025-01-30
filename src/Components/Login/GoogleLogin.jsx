import { FcGoogle } from "react-icons/fc";
import PropTypes from 'prop-types';

const GoogleLogin = ({ handleGoogleSignIn }) => {
    return (
        <div onClick={handleGoogleSignIn} className="flex items-center gap-2 justify-center py-3 w-full mt-4 rounded text-[#000] dark:text-white poppins text-base font-normal cursor-pointer border-2"><FcGoogle className="text-2xl"/><span>Sign In with Google</span></div>
    );
};

GoogleLogin.propTypes = {
    handleGoogleSignIn: PropTypes.func,
}

export default GoogleLogin;