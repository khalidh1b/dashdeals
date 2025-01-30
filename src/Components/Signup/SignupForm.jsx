import PropTypes from 'prop-types';

const SignupForm = ({ handleSignup, loading }) => {
    return (
        <>
            <form onSubmit={handleSignup}>
                    <input className="border-b-[1px] w-full border-[#000000] dark:bg-[#09090B] dark:border-b-2 dark:border-b-gray-400 pb-1 mb-7 border-x-0 border-t-0 focus:outline-none" type="text" name="name" id="" placeholder="Name"/> <br />
                    <input className="focus:outline-none border-b-2 w-full pb-1 mb-7 border-x-0 border-t-0 dark:bg-[#09090B] dark:border-b-2 dark:border-b-gray-400" type="email" name="email" id="" placeholder="Email or Phone Number" required/> <br />
                    <input className="border-b-2 focus:outline-none w-full  mb-8 pb-1 border-x-0 border-t-0 dark:bg-[#09090B] dark:border-b-2 dark:border-b-gray-400" type="password" name="password" id="" placeholder="Password" required/> <br />
                    <button disabled={loading ? true : false} className="text-white bg-[#DB4444] rounded py-3 w-full flex justify-center gap-2" type="submit">Create Account {loading &&<span className="loading loading-spinner loading-md"></span>}</button>
            </form>
        </>
    );
};

SignupForm.propTypes = {
    handleSignup: PropTypes.func,
    loading: PropTypes.bool
}

export default SignupForm;