
const Checkout = () => {
    return (
        <div className="flex items-center justify-center gap-28 py-40">
            <div className="w-[480px]">
                <h1 className="text-[#000] text-[32px] font-medium pb-8">Billing Details</h1>
                <label className="text-base font-normal poppins text-gray-400">First Name<span className="text-red-400">*</span></label> <br />
                <input type="text" name="" id="" className="bg-[#F5F5F5] w-full py-2 pl-2 mt-1 rounded focus:outline-none mb-6"/> <br />
                <label>Company Name</label> <br />
                <input type="text" name="" id="" className="bg-[#F5F5F5] w-full py-2 pl-2 mt-1 rounded focus:outline-none mb-6"/> <br />
                <label>Street Address<span className="text-red-400">*</span></label> <br />
                <input type="text" name="" id="" className="bg-[#F5F5F5] w-full py-2 pl-2 mt-1 rounded focus:outline-none mb-6"/> <br />
                <label>Apartment, floor, etc, (optional)</label> <br />
                <input type="text" name="" id="" className="bg-[#F5F5F5] w-full py-2 pl-2 mt-1 rounded focus:outline-none mb-6"/> <br />
                <label>Town/City<span className="text-red-400">*</span></label> <br />
                <input type="text" name="" id="" className="bg-[#F5F5F5] w-full py-2 pl-2 mt-1 rounded focus:outline-none mb-6"/> <br />
                <label>Phone Number<span className="text-red-400">*</span></label> <br />
                <input type="number" name="" id="" className="bg-[#F5F5F5] w-full py-2 pl-2 mt-1 rounded focus:outline-none mb-6"/> <br />
                <label>Email Address<span className="text-red-400">*</span></label> <br />
                <input type="email" name="" id="" className="bg-[#F5F5F5] w-full py-2 pl-2 mt-1 rounded focus:outline-none mb-6"/>
                {/* checkbox */}
                <label className="relative flex select-none items-center cursor-pointer text-lg">
                <input type="checkbox" className="sr-only peer"/>
                <div className="w-5 h-5 bg-gray-200 rounded peer-checked:bg-orange-500 "></div>
                <span className="ml-2 poppins text-base font-normal">Save this information for faster check-out next time</span>
                </label>
                {/* checkbox */}
            </div>
            <div className="pr-24 w-5/12 text-[#000] text-base font-normal poppins">
                <div className="flex justify-between items-center pb-7">
                    <div className="flex gap-6 items-center"><img className="w-14 h-14" src="https://i.postimg.cc/Gmc0dKT8/ips-lcd-gaming-minitor.png" alt="LCD-Monitor" />
                    <p>LCD Monitor</p></div>
                    <p>$1100</p>
                </div>
                <div className="flex justify-between items-center pb-7">
                    <div className="flex gap-6 items-center"><img className="w-14 h-14" src="https://i.postimg.cc/x8hr0VH9/G92-Gamepad.png" alt="LCD-Monitor" />
                    <p>H1 Gamepad</p></div>
                    <p>$650</p>
                </div>
                <div className="flex justify-between pb-3"><p>Subtotal:</p><span>$1750</span></div>
                <hr className="border-gray-300"/>
                <div className="flex justify-between py-3"><p>Shipping:</p><span>Free</span></div>
                <hr className="border-t-2"/>
                <div className="flex justify-between pt-3"><p>Total:</p><span>$1750</span></div>
                {/* radio */}
                <div className="flex justify-between items-center pt-8">
                    <div>
                        <label className="flex items-center cursor-pointer text-lg">
                        <input type="radio" name="payment_method" id="payment_method" className="peer hidden" />
                        <div className="w-5 h-5 border-[3px] border-gray-300 rounded-full peer-checked:bg-blue-600 flex items-center justify-center">
                        </div>
                        <span className="ml-2">Bank/MFS</span>
                        </label>
                    </div>
                    <div className="flex gap-2 items-center">
                        <img src="https://i.postimg.cc/q7zc7RQ8/bkash.png" alt="bkash" />
                        <img src="https://i.postimg.cc/CK38L4Rg/visaCard.png" alt="visa" />
                        <img src="https://i.postimg.cc/KvGMzj8R/mastercard.png" alt="mastercard" />
                        <img src="https://i.postimg.cc/Kz71chXP/nagad.png" alt="nagad" />
                    </div>
                </div>
                {/* radio */}
                {/* radio */}
                <label className="flex items-center cursor-pointer text-lg pt-3">
                <input type="radio" name="payment_method" id="payment_method" className="peer hidden" />
                <div className="w-5 h-5 border-[3px] border-gray-300 rounded-full peer-checked:bg-blue-600 flex items-center justify-center">
                </div>
                <span className="ml-2">Cash on delivery</span>
                </label>
                {/* radio */}
                <div className="flex gap-4 pt-6">
                    <input className="py-3 pl-4 pr-16 border rounded border-[#000000] focus:outline-none" type="text" name="" id="" placeholder="Coupon Code"/>
                    <button className="bg-[#DB4444] py-3 px-9 rounded text-white" type="submit">Apply Coupon</button>
                </div>
                <button className="bg-[#DB4444] py-3 px-8 rounded mt-7 text-white" type="submit">Place Order</button>
            </div>
        </div>
    );
};

export default Checkout;