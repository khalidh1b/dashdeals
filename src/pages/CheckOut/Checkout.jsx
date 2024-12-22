import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Checkout = () => {
    const location = useLocation();
    const { pandey, cartSubtotal, cartData } = location.state || {};
    const [productDetails, setProductDetails] = useState([]);
    const [payment_method, setPaymentMethod] = useState();
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log('Received state in Checkout:', { pandey, cartSubtotal, cartData });
    // }, [location.state, pandey, cartSubtotal, cartData]);
    const isFirstRender = useRef(true);

useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        console.log('Received state in Checkout:', { pandey, cartSubtotal, cartData });
        // Your request logic here
    } else {
        console.log('Skipping additional effect run');
    }
}, [location.state, pandey, cartSubtotal, cartData]);

    useEffect(() => {
            if (cartData && pandey) {
            const details = Object.entries(pandey).map(([productId, subtotal]) => {
                const product = cartData.find(p => p._id === productId);
                return {
                id: productId, 
                product_title: product?.product_title || 'Unknown Product',
                product_image: product?.product_image || '',
                price: subtotal
                };
            });
            setProductDetails(details);
            }
        }, [cartData, pandey]);
        // console.log(productDetails)

        let path = '/bankormfs';
        if(payment_method === 'cashondelivery') {
            path = '/cashondelivery';
        }
        else if(payment_method === 'bankormfs') {
            path = '/bankormfs';
        }
        const bankOrMFS = () => {
            setPaymentMethod('bankormfs');
            console.log(payment_method)
        }
        
        const cashOnDelivery = () => {
            setPaymentMethod('cashondelivery')
            console.log(payment_method)
        }

        const placeOrder = () => {
            const data = { cartSubtotal, cartData };
            console.log(`Navigating to ${path} with state:`, data);
            navigate(`${path}`, { state: data })
        }
    return (
        <div className="flex items-center justify-center gap-28 py-40">
            <div className="w-[480px]">
                <h1 className="text-[#000] dark:text-white text-[32px] font-medium pb-8">Billing Details</h1>
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
                {
                    productDetails.map(productDetail => <div className="dark:text-white" key={productDetail.id}>
                    <div className="flex justify-between items-center pb-7">
                    <div className="flex gap-6 items-center"><img className="w-14 h-14" src={productDetail.product_image} alt="LCD-Monitor" />
                    <p>{productDetail.product_title}</p></div>
                    <p>${productDetail.price}</p>
                    </div>
                </div>)
                }
                <div className="flex justify-between pb-3 dark:text-white"><p>Subtotal:</p><span>${cartSubtotal}</span></div>
                <hr className="border-gray-300"/>
                <div className="flex justify-between py-3 dark:text-white"><p>Shipping:</p><span>Free</span></div>
                <hr className="border-t-2"/>
                <div className="flex justify-between pt-3 dark:text-white"><p>Total:</p><span>${cartSubtotal}</span></div>
                {/* radio */}
                <div className="flex justify-between items-center pt-8">
                    <div>
                        <label onClick={bankOrMFS} className="flex items-center cursor-pointer text-lg">
                        <input defaultChecked type="radio" name="payment_method" id="payment_method" className="peer hidden" />
                        <div className="w-5 h-5 border-[3px] border-gray-300 rounded-full peer-checked:bg-blue-600 flex items-center justify-center">
                        </div>
                        <span className="ml-2 dark:text-white">Bank/MFS</span>
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
                <label onClick={cashOnDelivery} className="flex items-center cursor-pointer text-lg pt-3">
                <input type="radio" name="payment_method" id="payment_method" className="peer hidden" />
                <div className="w-5 h-5 border-[3px] border-gray-300 rounded-full peer-checked:bg-blue-600 flex items-center justify-center">
                </div>
                <span className="ml-2 dark:text-white">Cash on delivery</span>
                </label>
                {/* radio */}
                <div className="flex gap-4 pt-6">
                    <input className="py-3 pl-4 pr-16 border rounded border-[#000000] focus:outline-none" type="text" name="" id="" placeholder="Coupon Code"/>
                    <button className="bg-[#DB4444] py-3 px-9 rounded text-white" type="submit">Apply Coupon</button>
                </div>
                <button onClick={placeOrder} className="bg-[#DB4444] py-3 px-8 rounded mt-7 text-white" type="submit">Place Order</button>
            </div>
        </div>
    );
};

export default Checkout;