import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";

const Navbar = () => {
    return (
        <div>
            <nav className="flex items-center justify-around pt-10"> 
                <h1 className="text-[#000] text-2xl font-semibold">DashDeals</h1>
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
                </div>
            </nav>
        </div>
    );
};

export default Navbar;