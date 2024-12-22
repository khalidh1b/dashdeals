import { FaArrowRight } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";


const Banner = () => {
    return (
        <div className="flex justify-center gap-10 items-center">
            <div className="border-r px-5 pt-16">
                <ul className="grid gap-4 text-[#000] dark:text-white text-base poppins font-normal">
                    <li className="flex items-center justify-between gap-10"><a href="#">Womans Fashion</a><MdKeyboardArrowRight className="text-xl"/></li>
                    <li className="flex items-center justify-between"><a href="#">Mens Fashion</a><MdKeyboardArrowRight className="text-xl"/></li>
                    <li><a href="#">Electronics</a></li>
                    <li><a href="#">Home & Lifestyle</a></li>
                    <li><a href="#">Medicine</a></li>
                    <li><a href="#">Sports & Outdoor</a></li>
                    <li><a href="#">Babys & Toys</a></li>
                    <li><a href="#">Groceries & Pets</a></li>
                    <li><a href="#">Health & Beauty</a></li>
                </ul>
            </div>
            <div className="mt-10 border">
                <div className="flex items-center gap-5 rounded bg-[#000] pl-14 py-5">
                    <div>
                        <div className="flex items-center gap-6"><img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729410233/apple-logo_uvcfq8.png" alt="logo" /><span className="text-[#FAFAFA] poppins text-base font-normal">iPhone 14 Series</span></div>
                        <h1 className="text-[#FAFAFA] text-[48px] pt-3 pb-5 font-semibold leading-[60px]">Up to 10% <br /> off Voucher</h1>
                        <div className="flex gap-2 items-center"><p className="flex items-center gap-2 border-b text-[#FAFAFA] poppins text-base font-medium">Shop Now</p> <FaArrowRight className="text-white"/></div>
                    </div>
                    <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729410063/banner_uln8mz.png" alt="banner" />
                </div>
            </div>
        </div>
    );
};

export default Banner;