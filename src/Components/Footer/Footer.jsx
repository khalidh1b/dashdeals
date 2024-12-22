import { IoMdSend } from "react-icons/io";
import { FaInstagram, FaLinkedinIn, FaRegCopyright } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";


const Footer = () => {
    return (
        <div>
            <div className="bg-[#000] flex justify-center gap-20 pt-20 pb-16">
            <div>
                <h4 className="text-2xl font-semibold text-[#FAFAFA]">Exclusive</h4>
                <h5 className="text-[#FAFAFA] text-xl pt-3 font-normal poppins">Subscribe</h5>
                <p className="text-base text-[#FAFAFA] pt-5 pb-2 font-normal poppins">Get 10% off your first order</p>
                <div className="flex relative"><input className="py-2 pl-3 bg-[#000] dark:bg-[#27272A] border rounded" type="text" name="" id="" placeholder="Enter your email"/>
                <IoMdSend className="absolute text-white text-2xl right-3 top-2"/></div>
            </div>
            <ul className="text-[#FAFAFA] text-base poppins font-normal">
                <li className="text-xl font-medium text-[#FAFAFA] pb-4"><a href="#">Support</a></li>
                <li><a href="#">111 Bijoy sarani, Dhaka, <br /> DH 1515, Bangladesh.</a></li>
                <li className="pt-4 pb-4"><a href="#">exclusive@gmail.com</a></li>
                <li><a href="#">+88015-88888-9999</a></li>
            </ul>
            <ul className="text-[#FAFAFA] text-base poppins font-normal">
                <li className="text-xl font-medium text-[#FAFAFA] pb-4"><a href="#">Account</a></li>
                <li className="pb-3"><a href="#">My Account</a></li>
                <li className="pb-3"><a href="#">Login / Register</a></li>
                <li className="pb-3"><a href="#">Cart</a></li>
                <li className="pb-3"><a href="#">Wishlist</a></li>
                <li><a href="#">Shop</a></li>
            </ul>
            <ul className="text-[#FAFAFA] text-base poppins font-normal">
                <li className="text-xl font-medium text-[#FAFAFA] pb-4"><a href="#">Quick Link</a></li>
                <li className="pb-3"><a href="#">Privacy Policy</a></li>
                <li className="pb-3"><a href="#">Terms Of Use</a></li>
                <li className="pb-3"><a href="#">FAQ</a></li>
                <li><a href="#">Contact</a></li>
            </ul>
            <div>
                <h4 className="text-xl font-medium text-[#FAFAFA] pb-4">Download App</h4>
                <p className="text-[12px] poppins font-medium text-[#FAFAFA] pb-1">Save $3 with App New User Only</p>
                <div className="flex gap-3">
                <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411583/Qrcode_1_frzc4d.png" alt="qr-code" />
                <div className="grid gap-2">
                    <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411582/google-play-store_xz5mmg.png" alt="play-store" />
                    <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411581/appstore_lkwdcq.png" alt="app-store" />
                </div>
                </div>
                <div className="text-white flex pt-5 gap-4 items-center">
                    <FaFacebookF className="text-xl"/>
                    <CiTwitter className="text-xl"/>
                    <FaInstagram className="text-xl"/>
                    <FaLinkedinIn className="text-xl"/>
                </div>
            </div>
        </div>
        <p className="text-white poppins text-base font-normal flex items-center gap-1 justify-center py-6 border-t-[1px] border-t-gray-500 bg-[#000]"> <FaRegCopyright /> Copyright DashDeals 2024. All right reserved</p>
        </div>
    );
};

export default Footer;