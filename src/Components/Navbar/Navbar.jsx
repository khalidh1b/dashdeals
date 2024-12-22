import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import {Link} from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
// import PropTypes from 'prop-types';

const Navbar = () => {
    const { user } = useContext(AuthContext);     
    const axiosSecure = useAxiosSecure();

    const { data: carts = [], } = useQuery({
        queryKey: ["carts", user?.email],
        queryFn: async () => {
        const res = await axiosSecure.get(`users/userProductCarts/${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
        });
        return res.data;
    },
    enabled: !!user?.email,
});

    return (
        <div>
            <nav className="flex items-center justify-around pt-10 border-b pb-5"> 
                <Link to="/"><h1 className="text-[#000] dark:text-white text-2xl font-semibold">DashDeals</h1></Link>
                <ul className="flex gap-12 items-center">
                    <Link to="/" className="text-[#000] dark:text-white text-base font-medium"><li href="#">Home</li></Link>
                    <Link to="/contact" className="text-[#000] dark:text-white text-base font-medium"><li href="#">Contact</li></Link>
                    <Link to="/about" className="text-[#000] dark:text-white text-base font-medium"><li href="#">About</li></Link>
                    <Link to="/login" className="text-[#000] dark:text-white text-base font-medium"><li href="#">Login</li></Link>
                </ul>
                <div className="flex items-center gap-6">
                    <div className="flex relative"><input className="bg-[#F5F5F5] dark:bg-[#27272A80] py-2.5 pl-4 pr-10 rounded focus:outline-none" type="text" name="" id="" placeholder="What are you looking for?"/>
                    <CiSearch className="absolute right-4 top-2.5 text-2xl font-medium placeholder:text-[10px] placeholder:font-normal"/></div>
                    <Link to="/wishlist"><FaRegHeart className="text-2xl"/></Link>
                    <div className="relative">
                        <Link to="/carts"><BsCart3 className="text-2xl"/></Link>
                        {carts.length > 0 && <span className="absolute bottom-3 left-4 bg-red-100 px-[7px] rounded-full dark:bg-[#27272A80]">{carts.length}</span>}
                    </div>
                    <ProfileMenu/>
                </div>
            </nav>

        </div>
    );
};

// Navbar.propTypes = {
//     products: PropTypes.array.isRequired
// };

export default Navbar;