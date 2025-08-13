import useHandleCheckout from "../../hooks/useHandleCheckout";
import PropTypes from 'prop-types';

const Checkout = () => {

    const { 
        bankOrMFS, 
        cashOnDelivery, 
        placeOrder, 
        productDetails, 
        cartSubtotal
    } = useHandleCheckout();

    return (
        <div className="md:flex items-center justify-center gap-28 py-40">
        <div className="md:w-[480px] mx-5">
            <h1 className="text-[#000] dark:text-white text-[32px] font-medium pb-8">Billing Details</h1>

            <BillingInput label="First Name"  required />
            <BillingInput label="Company Name" />
            <BillingInput label="Street Address" required />
            <BillingInput label="Apartment, floor, etc. (optional)" />
            <BillingInput label="Town/City" required />
            <BillingInput label="Phone Number" type="number" required />
            <BillingInput label="Email Address" type="email" required />

            <label className="relative flex select-none items-center cursor-pointer text-lg">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-5 h-5 bg-gray-200 rounded peer-checked:bg-orange-500"></div>
                <span className="ml-2 poppins text-base font-normal">
                    Save this information for faster check-out next time
                </span>
            </label>
        </div>

        <div className="md:pr-24 md:w-5/12 md:mx-0 mx-4 md:mt-0 mt-5 text-[#000] text-base font-normal poppins">
            {productDetails.map((product) => (
            <ProductSummary key={product.id} product={product} />
            ))}

            <OrderSummary cartSubtotal={cartSubtotal} />

            <div className="flex justify-between items-center pt-8">
            <RadioOption label="Bank/MFS" onClick={bankOrMFS} defaultChecked />
            <div className="flex gap-2 items-center">
                <img src="https://i.postimg.cc/q7zc7RQ8/bkash.png" alt="bkash" />
                <img src="https://i.postimg.cc/CK38L4Rg/visaCard.png" alt="visa" />
                <img src="https://i.postimg.cc/KvGMzj8R/mastercard.png" alt="mastercard" />
                <img src="https://i.postimg.cc/Kz71chXP/nagad.png" alt="nagad" />
            </div>
            </div>

            <RadioOption label="Cash on delivery" onClick={cashOnDelivery} />

            <CouponSection />

            <button
                onClick={placeOrder}
                className="bg-[#DB4444] md:py-3 py-2 w-40 px-8 rounded mt-7 text-white"
                type="submit"
            >
            Place Order
            </button>
        </div>
    </div>
    );
};

export default Checkout;

const BillingInput = ({ label, required, type = 'text', ...props }) => {
    return (
        <div className="mb-6">
            <label className="text-base font-normal poppins text-gray-400">
                {label}
                {required && <span className="text-red-400">*</span>}
            </label>
            <input
                type={type}
                className="bg-[#F5F5F5] w-full py-2 pl-2 mt-1 rounded focus:outline-none"
                {...props}
            />
        </div>
    )
};

const RadioOption = ({ label, onClick, defaultChecked }) => {
    return (
        <label onClick={onClick} className="flex items-center cursor-pointer text-lg pt-3">
            <input
                type="radio"
                name="payment_method"
                className="peer hidden"
                defaultChecked={defaultChecked}
            />
            <div className="w-5 h-5 border-[3px] border-gray-300 rounded-full peer-checked:bg-blue-600 flex items-center justify-center" />
            <span className="ml-2 dark:text-white">{label}</span>
        </label>
    )
};

const ProductSummary = ({ product }) => {
    return (
        <div className="flex justify-between items-center pb-7 dark:text-white">
            <div className="flex gap-6 items-center">
            <img 
                className="w-14 h-14" 
                src={product.product_image} 
                alt={product.product_title} 
            />
            <p>{product.product_title}</p>
            </div>
            <p>${product.price}</p>
        </div>
    )
};

const CouponSection = () => {
    return (
        <div className="flex gap-4 pt-6">
            <input
                className="md:py-3 pl-4 md:pr-16 border rounded border-[#000000] focus:outline-none"
                type="text"
                placeholder="Coupon Code"
            />
            <button className="bg-[#DB4444] md:py-3 md:px-9 px-6 rounded text-white" type="submit">
                Apply Coupon
            </button>
        </div>
    )
};

const OrderSummary = ({ cartSubtotal }) => {
    return (
        <>
        <div className="flex justify-between pb-3 dark:text-white">
          <p>Subtotal:</p>
          <span>${cartSubtotal}</span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between py-3 dark:text-white">
          <p>Shipping:</p>
          <span>Free</span>
        </div>
        <hr className="border-t-2" />
        <div className="flex justify-between pt-3 dark:text-white">
          <p>Total:</p>
          <span>${cartSubtotal}</span>
        </div>
      </>
    )
};

OrderSummary.propTypes = {
    cartSubtotal: PropTypes.number,
};

ProductSummary.propTypes = {
    product: PropTypes.object
};

RadioOption.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    defaultChecked: PropTypes.any
};

BillingInput.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string
};