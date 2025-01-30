
const Coupon = () => {
    return (
        <div className="md:w-3/2">
            <input
                className="border-2 border-gray-400 rounded py-2.5 pr-10 pl-3"
                type="text"
                placeholder="Coupon Code"
            />
            <button className="bg-[#DB4444] py-3 px-10 md:ml-3 md:mt-0 mt-3 rounded text-white" type="submit">
                Apply Coupon
            </button>
        </div>
    );
};

export default Coupon;