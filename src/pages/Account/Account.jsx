import {Link, Outlet, useLocation} from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';

const Account = () => {
    const location = useLocation();
    return (
        <>
            <Navbar></Navbar>
        <div className="flex justify-center gap-24 py-24">
            <div>
                <ul>
                    <li className={location.pathname === '/account/manageMyAccount' ? 'text-[#DB4444] poppins text-base font-medium' : 'text-[#000] poppins text-base font-medium' }><Link to="manageMyAccount" href="#">Manage My Account</Link></li>
                    <li className={location.pathname === '/account/myProfile' ? 'text-[#DB4444] pl-10 pt-4 pb-2' : 'text-[#000] pl-10 pt-4 pb-2'}><Link to='myProfile'>My Profile</Link></li>
                    <li className={location.pathname === '/account/addressBook' ? "text-[#DB4444] pl-10 pb-2" : "text-[#000] pl-10 pb-2"}><Link to='addressBook'>Address Book</Link></li>
                    <li className={location.pathname === '/account/myPaymentOptions' ? "text-[#DB4444] pl-10 pb-6" : "text-[#000] pl-10 pb-6"}><Link to="myPaymentOptions">My Payment Options</Link></li>
                </ul>
                <ul>
                    <li className={location.pathname === '/account/myOrder' ? "text-[#DB4444] poppins text-base font-medium" : "text-[#000] poppins text-base font-medium"}><Link to="myOrder">My Orders</Link></li>
                    <li className={location.pathname === '/account/myReturns' ? "text-[#DB4444] pl-10 pb-2 pt-3" : "pl-10 pb-2 pt-3"}><Link to="myReturns">My Returns</Link></li>
                    <li className={location.pathname === '/account/myCancellations' ? "text-[#DB4444] pl-10 pb-3" : "pl-10 pb-3"}><Link to="myCancellations">My Cancellations</Link></li>
                </ul>
                <h4 className= {location.pathname === '/account/myWishlist' ? "text-[#DB4444] poppins text-base font-medium" : "text-[#000] poppins text-base font-medium"}><Link to="myWishlist">My Wishlist</Link></h4>
            </div>
            <div className='w-1/2'><Outlet></Outlet></div>
        </div>
        <Footer></Footer>
        </>
    );
};

export default Account;