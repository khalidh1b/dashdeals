import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import {AuthContext} from '../../providers/AuthProvider';

const Signup = () => {
    const {createUser} = useContext(AuthContext);

    const handleSignup = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const data = {name, email, password};
        console.log(data);

        //creating user via email and password
        createUser(data.email, data.password)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="flex items-center pb-32 pt-20 gap-24">
            <div className="bg-[#CBE4E8] pt-10">
                <img src="https://i.postimg.cc/XvTRkQ6B/dl-beatsnoop-1.png" alt="signup-banner" />
            </div>
            <div>
                <h3 className="text-[#000] text-[36px] font-medium">Create an account</h3>
                <h5 className="text-[#000] poppins text-base font-normal pb-10">Enter your details below</h5>
                <form onSubmit={handleSignup}>
                    <input className="border-b-[1px] w-full border-[#000000] pb-1 mb-7 border-x-0 border-t-0 focus:outline-none" type="text" name="name" id="" placeholder="Name"/> <br />
                    <input className="focus:outline-none border-b-2 w-full pb-1 mb-7 border-x-0 border-t-0" type="email" name="email" id="" placeholder="Email or Phone Number" required/> <br />
                    <input className="border-b-2 focus:outline-none w-full  mb-8 pb-1 border-x-0 border-t-0" type="password" name="password" id="" placeholder="Password" required/> <br />
                    <button className="text-white bg-[#DB4444] rounded py-3 w-full" type="submit">Create Account</button>
                </form>
                <div className="flex items-center gap-2 justify-center py-3 w-full mt-4 rounded text-[#000] poppins text-base font-normal cursor-pointer border-2"><FcGoogle className="text-2xl"/><span>Sign Up with Google</span></div>
                <div className="flex justify-center gap-2 pt-8"><p className="poppins text-base font-normal text-[#000]">Already have an account</p><span className="text-[#000] text-base font-medium poppins">Login</span></div>
            </div>
        </div>
    );
};

export default Signup;