import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../../providers/AuthProvider";

const Login = () => {
    const {signIn, googleSignIn} = useContext(AuthContext);

    const handleSignIn = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const data = {email, password};
        console.log(data);

        signIn(data.email, data.password)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleGoogleSignIn = () => {
        googleSignIn()
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
                <h3 className="text-[#000] text-[36px] font-medium">Log in to Exclusive</h3>
                <h5 className="text-[#000] poppins text-base font-normal pb-10">Enter your details below</h5>
                <form onSubmit={handleSignIn}>
                    <input className="focus:outline-none border-b-2 w-full pb-1 mb-7 border-x-0 border-t-0" type="email" name="email" id="" placeholder="Email or Phone Number"/> <br />
                    <input className="border-b-2 focus:outline-none w-full  pb-1 border-x-0 border-t-0" type="password" name="password" id="" placeholder="Password"/>
                    <p className="mb-8 pt-1 text-[#DB4444] text-[14px]">forget password </p>
                    <br />
                    <button className="text-white bg-[#DB4444] rounded py-3 w-full" type="submit">Login</button>
                </form>
                <div onClick={handleGoogleSignIn} className="flex items-center gap-2 justify-center py-3 w-full mt-4 rounded text-[#000] poppins text-base font-normal cursor-pointer border-2"><FcGoogle className="text-2xl"/><span>Sign In with Google</span></div>
                <div className="flex justify-center gap-2 pt-8"><p className="poppins text-base font-normal text-[#000]">New to here go?</p><span className="text-[#000] text-base font-medium poppins">Signup</span></div>
            </div>
        </div>
    );
};

export default Login;