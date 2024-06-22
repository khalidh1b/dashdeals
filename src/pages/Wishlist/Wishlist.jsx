import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";


const Wishlist = () => {
    
    const [ratings, setRatings] = useState(20);
    return (
        <div className="pt-20 pb-28">
            <div className="flex justify-between items-center mx-32">
                <p>Wishlist<span> (4)</span></p>
                <button className="text-[#000] poppins text-base font-medium py-3 px-10 border border-[#000] rounded">Move All To Bag</button>
            </div>

            <div className="flex justify-center gap-8 pt-10">
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/x8hr0VH9/G92-Gamepad.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-40%</span>
                <RiDeleteBinLine className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">Havit HV-G92 Gamepad</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$120</h5><span className="text-gray-500 font-medium line-through text-xl">$160</span></div>
            </div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/x8hr0VH9/G92-Gamepad.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-40%</span>
                <RiDeleteBinLine className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">Havit HV-G92 Gamepad</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$120</h5><span className="text-gray-500 font-medium line-through text-xl">$160</span></div>
            </div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/x8hr0VH9/G92-Gamepad.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-40%</span>
                <RiDeleteBinLine className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">Havit HV-G92 Gamepad</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$120</h5><span className="text-gray-500 font-medium line-through text-xl">$160</span></div>
            </div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/x8hr0VH9/G92-Gamepad.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-40%</span>
                <RiDeleteBinLine className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">Havit HV-G92 Gamepad</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$120</h5><span className="text-gray-500 font-medium line-through text-xl">$160</span></div>
            </div>
            </div>

            <div className="flex justify-between gap-5 mx-20 py-24">
                <div className="flex text-[#DB4444] items-center gap-3 font-semibold">
                    <div className="bg-[#DB4444] rounded py-5 px-2"></div>
                    Just For You
                </div>
                <button className="py-3 px-12 text-[#000] poppins text-base font-medium rounded border-2">See All</button>
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

export default Wishlist;