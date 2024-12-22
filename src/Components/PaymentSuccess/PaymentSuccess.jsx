import { IoMdCheckmark } from "react-icons/io";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import { useContext, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";

const PaymentSuccess = () => {
    // Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
// const [orderInfo, setOrderInfo] = useState(null);


// Usage
const tran_id = getUrlParameter('tran_id');
const card_issuer = getUrlParameter('card_issuer');
const tran_date = getUrlParameter('tran_date');
const currency_type = getUrlParameter('currency_type');
const amount = getUrlParameter('amount');


// const {user} = useContext(AuthContext);
// const axiosSecure = useAxiosSecure();
// const userOrderInfo = () => {
//     console.log('trying to save order info');
//     axiosSecure.get(`/userProductCarts/${user?.email}`)
//     .then(res => setOrderInfo(res.data))
//     .catch(error => console.log(error))
//     if(orderInfo) {
//         axiosSecure.post('/userOrderInfo', orderInfo)
//         .then(res => console.log(res))
//         .catch(error => console.log(error))
//     }
// }
// userOrderInfo();

    return (
        <div className="py-20 border">
            <div className="border dark:border-white w-2/5 mx-auto pt-5 pb-5 rounded-2xl px-10">
                <div className="bg-[#23A26D1F] p-3 rounded-full w-[54px] mx-auto"><IoMdCheckmark className="text-white bg-[#23A26D] rounded-full text-3xl p-1"/></div>
                <h3 className="text-center pt-3">Payment Success!</h3>
                <h2 className="text-[#121212] dark:text-white poppins text-[30px] pt-1 pb-7 text-center font-semibold">{currency_type} {amount}</h2>
                <hr className="pb-10 border-t-[2px]"/>
                <div className="flex justify-between pb-4">
                    <p className="text-[#707070] dark:text-white text-base poppins font-normal">Transaction ID</p>
                    <p className="text-[#121212] dark:text-white text-base poppins font-semibold">{tran_id}</p>
                </div>
                <div className="flex justify-between pb-4">
                    <p className="text-[#707070] dark:text-white text-base poppins font-normal">Payment Time</p>
                    <p className="text-[#121212] dark:text-white text-base poppins font-semibold">{tran_date}</p>
                </div>
                <div className="flex justify-between pb-4">
                    <p className="text-[#707070] dark:text-white text-base poppins font-normal">Payment Method</p>
                    <p className="text-[#121212] dark:text-white text-base poppins font-semibold">{card_issuer}</p>
                </div>
                <hr className="mb-6"/>
                <div className="flex justify-between pb-3">
                    <p className="text-[#707070] dark:text-white text-base poppins font-normal">Currency Type</p>
                    <p className="text-[#121212] dark:text-white text-base poppins font-semibold">{currency_type}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-[#707070] dark:text-white text-base poppins font-normal">Amount</p>
                    <p className="text-[#121212] dark:text-white text-base poppins font-semibold">{currency_type} {amount}</p>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;