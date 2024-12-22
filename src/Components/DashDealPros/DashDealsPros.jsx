
const DashDealsPros = () => {
    return (
        <div className="flex gap-16 pt-28 pb-10  justify-center">
            <div>
                <div className="border p-2.5 rounded-full w-[70px] mx-auto bg-[#2F2E30]">
                    <img className="bg-[#000000] rounded-full p-1" src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411586/icon-delivery_qh7wv3.png" alt="delivary-icon" />
                </div>
                <h3 className="text-xl poppins font-semibold pt-4 text-[#000] dark:text-white">FREE AND FAST DELIVERY</h3>
                <p className="text-[14px] poppins font-normal">Free delivery for all orders over $140</p>
            </div>
            <div>
            <div className="border p-2.5 rounded-full w-[70px] mx-auto bg-[#2F2E30]">
                <img className="bg-[#000000] rounded-full p-1" src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411584/Icon-Customer_service_xrll7w.png" alt="customer-service" />
            </div>
            <h3 className="text-center text-xl poppins font-semibold pt-4 text-[#000] dark:text-white">24/7 CUSTOMER SERVICE</h3>
            <p className="text-[14px] poppins font-normal text-center">Friendly 24/7 customer support</p>
            </div>
            <div>
            <div className="border p-2.5 rounded-full w-[70px] mx-auto bg-[#2F2E30]">
                <img className="bg-[#000000] rounded-full p-1" src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411579/shield-tick_avmf48.svg" alt="shield-tick" />
            </div>
            <h3 className="text-xl poppins font-semibold pt-4 text-[#000] dark:text-white">MONEY BACK GUARANTEE</h3>
            <p className="text-[14px] poppins font-normal text-center">We reurn money within 30 days</p>
            </div>
        </div>
    );
};

export default DashDealsPros;