import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import {Link} from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import { TfiPackage } from "react-icons/tfi";
import { GiCancel } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { SlLogout } from "react-icons/sl";

const Navbar = () => {
    
    const user = true;
    return (
        <div>
            <nav className="flex items-center justify-around pt-10 border-b pb-5"> 
                <Link to="/"><h1 className="text-[#000] text-2xl font-semibold">DashDeals</h1></Link>
                <ul className="flex gap-12 items-center">
                    <li className="text-[#000] text-base font-medium"><a href="#">Home</a></li>
                    <li className="text-[#000] text-base font-medium"><a href="#">Contact</a></li>
                    <li className="text-[#000] text-base font-medium"><a href="#">About</a></li>
                    <li className="text-[#000] text-base font-medium"><a href="#">Signup</a></li>
                </ul>
                <div className="flex items-center gap-6">
                    <div className="flex relative"><input className="bg-[#F5F5F5] py-2.5 pl-4 pr-10 rounded focus:outline-none" type="text" name="" id="" placeholder="What are you looking for?"/>
                    <CiSearch className="absolute right-4 top-2.5 text-2xl font-medium placeholder:text-[10px] placeholder:font-normal"/></div>
                    <FaRegHeart className="text-2xl"/>
                    <BsCart3 className="text-2xl"/>

                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black bg-opacity-35 backdrop-blur-sm rounded-box w-52">
                        <li className="pb-1">
                        <a className="justify-between">
                            <FiUser className="text-white text-xl"/>
                            <p className="text-white">Manage My Account</p>
                        </a>
                        </li>
                        <li className="pb-1"><a><TfiPackage className="text-white text-xl"/><span className="text-white">My Order</span></a></li>
                        <li className="pb-1"><a><GiCancel className="text-xl text-white"/><span className="text-white">My Cancellations</span></a></li>
                        <li className="pb-1"><a><FaRegStar className="text-xl text-white"/><span className="text-white">My Reviews</span></a></li>
                        <li className="pb-1"><a><SlLogout className="text-xl text-white"/><span className="text-white">Logout</span></a></li>
                    </ul>
                    </div>
                    {!user && <FiUser className="bg-[#DB4444] text-4xl p-2 rounded-full text-white"/>}
                </div>
            </nav>



        </div>
    );
};

export default Navbar;