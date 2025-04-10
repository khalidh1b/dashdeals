import PassResetForm from "../PassResetForm/PassResetForm";
import PropTypes from "prop-types";
import { Loader2 } from 'lucide-react';

const LoginForm = ({ handleSignIn, handleForgetPass, loading }) => {
    return (
        <>
            <form onSubmit={handleSignIn}>
                    <input className="focus:outline-none border-b-2 w-full pb-1 mb-7 border-x-0 border-t-0 dark:bg-[#09090B]" type="email" name="email" id="" placeholder="Email or Phone Number"/> <br />
                    <input className="border-b-2 focus:outline-none w-full  pb-1 border-x-0 border-t-0 dark:bg-[#09090B]" type="password" name="password" id="" placeholder="Password"/>
                    <PassResetForm handleForgetPass={handleForgetPass}/>
                    <br />
                    <button disabled={loading ? true : false} className="text-white bg-[#DB4444] rounded py-3 w-full flex justify-center gap-2" type="submit">{loading ? <Loader2 className="animate-spin"/> : 'Login'}</button>
            </form>
        </>
    );
};

LoginForm.propTypes = {
    handleSignIn: PropTypes.func,
    handleForgetPass: PropTypes.func,
    loading: PropTypes.bool
}

export default LoginForm;