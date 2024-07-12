import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { GrPowerCycle } from "react-icons/gr";
import { useLoaderData } from "react-router-dom";


const ProductDetailsPage = () => {
    const [ratings, setRatings] = useState(20);
    const data = useLoaderData();
    const {_id, discount_percent, product_image, product_title, main_price, discount_price, rating, user_rating_count} = data;
    
    return (
        <div>

            <div className="flex justify-center gap-20 py-24">
                <div className="flex gap-7">
                    {/* review */}
                <div>
                    <img className="bg-[#F5F5F5] p-4 rounded mb-4 w-[121px] h-[114px]" src="https://i.postimg.cc/BtWZwCvm/review-1.png" alt="#" />
                    <img className="bg-[#F5F5F5] p-4 rounded mb-4 w-[121px] h-[114px]" src="https://i.postimg.cc/KvLsX5zt/review-2.png" alt="#" />
                    <img className="bg-[#F5F5F5] p-4 rounded mb-4 w-[121px] h-[114px]" src="https://i.postimg.cc/B6kNk8fh/review-3.png" alt="#" />
                    <img className="bg-[#F5F5F5] p-4 rounded mb-4 w-[121px] h-[114px]" src="https://i.postimg.cc/C1qbZm9N/review-4.png" alt="#" />
                </div>
                {/* review */}

                <div><img src={product_image} alt={product_title} className="w-[300px]"/></div>
                </div>

                <div>
                    <h2 className="text-[#000] font-semibold text-2xl">{product_title}</h2>
                    <div className="flex gap-2 items-center py-3"><Rating style={{ maxWidth: 130 }} value={rating} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">({user_rating_count} Reviews) | <span className="text-[#0F6] poppins text-[14px] font-normal">In Stock</span></span></div>
                    <p className="text-[#000] text-xl font-normal">{discount_price}</p>
                    <p className="text-[14px] poppins text-[#000] font-normal py-4">PlayStation 5 Controller Skin High quality vinyl with air <br /> channel adhesive for easy bubble free install & mess <br /> free removal Pressure sensitive.</p>
                    <hr className="border-[#000]"/>
                    <p className="text-xl font-normal text-[#000] py-3">Colours:</p>
                    <p className="text-xl font-normal text-[#000] pb-3">Size:</p>

                    <div className="flex gap-4 items-center">
                        <div className="flex items-center border">
                            <AiOutlineMinus className="text-[40px] border-r-2 py-1"/>
                            <span className="px-6">2</span>
                            <AiOutlinePlus className="text-[37px] text-white bg-[#DB4444]"/>
                        </div>
                        <button className="text-white bg-[#DB4444] py-2.5 px-12 rounded">Buy Now</button>
                        <IoIosHeartEmpty className="text-[45px] px-2 py-2 border rounded border-gray-400"/>
                    </div>

                    <div className="border rounded border-[#000] mt-6">
                        <div className="flex items-center gap-3 py-3 px-4">
                            <TbTruckDelivery className="text-3xl"/>
                            <div><p className="text-[#000] poppins text-base font-medium">Free Delivery</p>
                            <p className="text-[12px] text-[#000] font-medium">Enter your postal code for Delivery Availability</p></div>
                        </div>
                        <hr className="border-[#000]"/>
                        <div className="flex items-center px-4 py-3 gap-3">
                            <GrPowerCycle className="text-3xl"/>
                            <div><p className="text-[#000] poppins text-base font-medium">Return Delivery</p>
                            <p className="text-[12px] text-[#000] font-medium">Free 30 Days Delivery Returns. Details</p></div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="flex justify-between gap-5 mx-20 py-24">
                <div className="flex text-[#DB4444] items-center gap-3 font-semibold">
                    <div className="bg-[#DB4444] rounded py-5 px-2"></div>
                    Related Item
                </div>
            </div>

            <div className="flex justify-center pb-10 gap-10">
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/7PsTbfws/asus-gaming-laptop.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-45%</span>
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">ASUS FHD Gaming Laptop</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$129</h5><span className="text-gray-500 font-medium line-through text-xl">$300</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">(42)</span></div>
            </div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/7PsTbfws/asus-gaming-laptop.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-45%</span>
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">ASUS FHD Gaming Laptop</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$129</h5><span className="text-gray-500 font-medium line-through text-xl">$300</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">(42)</span></div>
            </div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/7PsTbfws/asus-gaming-laptop.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-45%</span>
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">ASUS FHD Gaming Laptop</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$129</h5><span className="text-gray-500 font-medium line-through text-xl">$300</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">(42)</span></div>
            </div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/7PsTbfws/asus-gaming-laptop.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-45%</span>
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">ASUS FHD Gaming Laptop</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$129</h5><span className="text-gray-500 font-medium line-through text-xl">$300</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">(42)</span></div>
            </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;