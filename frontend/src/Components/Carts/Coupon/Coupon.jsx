
const Coupon = () => {
    // Logic for handling apply coupon button click can be added here later
    // will make it reusable later

    return (
        <div className="md:w-1/3">
            <input
                className="border-2 border-gray-400 rounded py-2.5 pr-10 pl-3"
                type="text"
                placeholder="Coupon Code"
            />
            <button className="bg-red-500 hover:bg-red-600 py-3 px-10 md:ml-3 md:mt-0 mt-3 rounded text-white transition-colors" type="submit">
                Apply Coupon
            </button>
        </div>
    );
};

export default Coupon;
