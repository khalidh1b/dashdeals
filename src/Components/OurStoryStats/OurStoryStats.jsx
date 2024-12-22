
const OurStoryStats = () => {
    return (
        <div className="flex gap-6 pt-28 pb-10  justify-center">
            <div className="border-2 py-8 rounded px-10">
                <div className="border p-2.5 rounded-full w-[70px] mx-auto bg-[#2F2E30]">
                    <img className="bg-[#000000] rounded-full p-2.5" src="https://res.cloudinary.com/dksiicemx/image/upload/v1729423551/active-seller_ej1ycv.png" alt="delivary-icon" />
                </div>
                <h3 className="text-2xl poppins font-semibold pt-4 text-center text-[#000] dark:text-white">10.5K</h3>
                <p className="text-[14px] poppins font-normal">Seller active on our site</p>
            </div>
            <div className="border-0 text-white py-8 rounded px-10 bg-[#DB4444]">
            <div className="border p-2.5 rounded-full w-[70px] mx-auto bg-[#2F2E30]">
                <img className=" rounded-full p-1 bg-white" src="https://res.cloudinary.com/dksiicemx/image/upload/v1729423551/product-scale_vbf8pm.png" alt="monthly-product-sale" />
            </div>
            <h3 className="text-center text-2xl poppins font-semibold pt-4">33K</h3>
            <p className="text-[14px] poppins font-normal text-center">Mopnthly Produduct Sale</p>
            </div>
            <div className="border-2 py-8 rounded px-10">
            <div className="border p-2.5 rounded-full w-[70px] mx-auto bg-[#2F2E30]">
                <img className="bg-[#000000] rounded-full p-1" src="https://res.cloudinary.com/dksiicemx/image/upload/v1729423550/active-customer_ch2vda.png" alt="active-customer" />
            </div>
            <h3 className="text-2xl poppins font-semibold pt-4 text-center dark:text-white text-[#000]">45.5k</h3>
            <p className="text-[14px] poppins font-normal text-center">Customer active in our site</p>
            </div>
            <div className="border-2 py-8 rounded px-10">
            <div className="border p-2.5 rounded-full w-[70px] mx-auto bg-[#2F2E30]">
                <img className="bg-[#000000] rounded-full p-2.5" src="https://res.cloudinary.com/dksiicemx/image/upload/v1729423550/gross-sale_ix6ggs.png" alt="annual-gross-sale" />
            </div>
            <h3 className="text-2xl poppins font-semibold pt-4 text-center text-[#000] dark:text-white">25k</h3>
            <p className="text-[14px] poppins font-normal text-center">Anual gross sale in our site</p>
            </div>
        </div>
    );
};

export default OurStoryStats;