import { Link } from 'react-router-dom';

const SignupFooter = () => {
    return (
        <div className="flex justify-center gap-2 pt-8"><p className="poppins text-base font-normal text-[#000] dark:text-white">Already have an account</p><Link to="/login" className="text-[#000] dark:text-white text-base font-medium poppins">Login</Link></div>
    );
};

export default SignupFooter;