import { CiSearch } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import ProfileMenu from "@/components/user/profile-menu/ProfileMenu";
import useCart from '@/hooks/cart/useCart.js';
import PropTypes from 'prop-types';

const Navbar = () => {
    const [carts,  ] = useCart();

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/contact", label: "Contact" },
        { to: "/about", label: "About" },
        { to: "/login", label: "Login" }
    ];

    return (
        <nav className="flex items-center md:justify-around justify-between md:mx-0 mx-2 pt-5 border-b pb-5">
        <Link to="/">
            <h1 className="text-[#000] dark:text-white text-2xl font-semibold">DashDeals</h1>
        </Link>
        <ul className="md:flex gap-12 items-center hidden">
            {navLinks.map((link, index) => (
            <NavLink key={index} to={link.to} label={link.label} />
            ))}
        </ul>
        <div className="flex items-center gap-6">
            <SearchInput />
            <Link to="/wishlist">
                <FaRegHeart className="text-2xl" />
            </Link>
            <CartIcon cartCount={carts.length} />
            <ProfileMenu />
        </div>
    </nav>
    );
};

export default Navbar;

const NavLink = ({ to, label }) => {
    return (
        <Link to={to} className="text-[#000] dark:text-white text-base font-medium">
            <li>{label}</li>
        </Link>
    )
};

const SearchInput = () => {
    return (
        <div className="md:flex hidden relative">
            <input
                className="bg-[#F5F5F5] dark:bg-[#27272A80] py-2.5 pl-4 pr-10 rounded focus:outline-none"
                type="text"
                placeholder="What are you looking for?"
            />
            <CiSearch className="absolute right-4 top-2.5 text-2xl font-medium placeholder:text-[10px] placeholder:font-normal" />
        </div>
    )
};

const CartIcon = ({ cartCount }) => {
    return (
        <div className="relative">
            <Link to="/carts">
                <BsCart3 className="text-2xl" />
            </Link>
            {cartCount > 0 && (
            <span className="absolute bottom-3 left-4 bg-red-100 px-[7px] rounded-full dark:bg-[#27272A80]">
                {cartCount}
            </span>
            )}
        </div>
    )
};

CartIcon.propTypes = {
    cartCount: PropTypes.number.isRequired
};

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};