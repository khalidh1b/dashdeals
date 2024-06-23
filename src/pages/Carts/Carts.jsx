import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { LuDelete } from "react-icons/lu";


const Carts = () => {
    return (
        <div className="pt-24 pb-32">
            <div className="flex justify-center gap-72 border mx-32 py-5 px-5 rounded shadow-md text-base poppins font-normal"><p className="w-1/2">Product</p><p>Price</p><p>Quantity</p><p>Subtotal</p></div>

                <div className="flex items-center justify-center border mx-32 mt-9 py-7 rounded shadow-md text-base poppins font-normal px-5">
                    <div className="flex items-center gap-4 w-4/12 relative">
                        <LuDelete className="absolute text-xl text-red-500 bottom-7 left-9  top-"/>
                        <img className="w-12 h-10" src="https://i.postimg.cc/x8hr0VH9/G92-Gamepad.png" alt="#" />
                        <span>H1 Gamepad iron man diagram</span>
                    </div>
                    <p className="w-3/12">$650</p>
                    <div className="w-2/12 pl-10">
                        <div className="flex items-center justify-center gap-4 py-1 rounded border-[#000] w-20 border">
                            <span>01</span>
                            <div><IoIosArrowUp />
                            <IoIosArrowDown /></div>
                        </div>
                    </div>
                    <p className="w-3/12 flex justify-end pr-3">$650</p>
                </div>

                <div className="flex items-center justify-center border mx-32 mt-9 py-7 rounded shadow-md text-base poppins font-normal px-5">
                    <div className="flex items-center gap-4 w-4/12 relative">
                        <LuDelete className="absolute text-xl text-red-500 bottom-7 left-9  top-"/>
                        <img className="w-12 h-10" src="https://i.postimg.cc/x8hr0VH9/G92-Gamepad.png" alt="#" />
                        <span>H1 Gamepad iron man diagram</span>
                    </div>
                    <p className="w-3/12">$650</p>
                    <div className="w-2/12 pl-10">
                        <div className="flex items-center justify-center gap-4 py-1 rounded border-[#000] w-20 border">
                            <span>01</span>
                            <div><IoIosArrowUp />
                            <IoIosArrowDown /></div>
                        </div>
                    </div>
                    <p className="w-3/12 flex justify-end pr-3">$650</p>
                </div>

            <div className="flex justify-between mx-32 pt-8">
                <button className="text-[#000] poppins text-base font-medium py-3 px-9 border-2 rounded">Return To Shop</button>
                <button className="text-[#000] poppins text-base font-medium py-3 px-9 border-2 rounded">Update Cart</button>
            </div>


            <div className="pt-20 flex justify-center gap-44">
                <div className="w-3/2">
                    <input className="border-2 border-gray-400 rounded py-2.5 pr-10 pl-3" type="text" name="" id="" placeholder="Coupon Code"/>
                    <button className="bg-[#DB4444] py-3 px-10 ml-3 rounded text-white" type="submit">Apply Coupon</button>
                </div>
                <div className="border-2 rounded border-[#000] py-7 px-7 w-4/12 poppins text-base font-normal text-[#000]">
                    <h3 className="text-xl font-medium pb-5">Cart Total</h3>
                    <div className="flex pb-3 justify-between"><p>Subtotal:</p><span>$1750</span></div>
                    <hr className="border-b"/>
                    <div className="flex justify-between py-4"><p>Shipping:</p><span>Free</span></div>
                    <hr className="border-[#000]"/>
                    <div className="flex justify-between py-3"><p>Total:</p><span>$1750</span></div>
                    <div className="flex justify-center"><button className="py-3 px-9 bg-[#DB4444] text-white rounded">Process to checkout</button></div>
                </div>
            </div>
        </div>
    );
};

export default Carts;
