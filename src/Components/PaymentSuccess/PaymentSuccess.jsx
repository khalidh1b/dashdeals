import { IoMdCheckmark } from "react-icons/io";
import PropTypes from 'prop-types';
import { getPaymentSuccessParams } from "../../lib/getPaymentSuccessParams";

const PaymentSuccess = () => {
    
    const { 
        amount, 
        card_issuer, 
        currency_type, 
        tran_date, 
        tran_id 
    } = getPaymentSuccessParams();

    return (
        <div className="py-20 border">
            <div className="border dark:border-white md:w-2/5 md:mx-auto mx-2 pt-5 pb-5 rounded-2xl px-10">
                <div className="bg-[#23A26D1F] p-3 rounded-full w-[54px] mx-auto">
                    <IoMdCheckmark className="text-white bg-[#23A26D] rounded-full text-3xl p-1"/>
                </div>
                <h3 className="text-center pt-3">Payment Success!</h3>
                <h2 className="text-[#121212] dark:text-white poppins text-[30px] pt-1 pb-7 text-center font-semibold">{currency_type} {amount}</h2>
                
                <hr className="pb-10 border-t-[2px]"/>
                <PaymentSuccessRow 
                    title="Transaction ID"
                    tran_id={tran_id} 
                />
                
                <PaymentSuccessRow 
                    title="Payment Time" 
                    tran_date={tran_date}
                />

                <PaymentSuccessRow 
                    title="Payment Method" 
                    card_issuer={card_issuer}
                />
                <hr className="mb-6 mt-6"/>
                
                <PaymentSuccessRow 
                    title="Currency Type" 
                    currency_type={currency_type}
                />
                <PaymentSuccessRow 
                    title="Amount"
                    currency_type={currency_type}
                    amount={amount} 
                />
            </div>
        </div>
    );
};

export default PaymentSuccess;

const PaymentSuccessRow = ({ 
    currency_type, 
    amount, 
    title, 
    card_issuer,
    tran_date, 
    tran_id 
}) => {
    return (
        <div className="flex justify-between mt-4">
            <p className="text-[#707070] dark:text-white text-base poppins font-normal">{title}</p>
            <p className="text-[#121212] dark:text-white text-base poppins font-semibold">
                {currency_type} {amount} 
                {card_issuer} 
                {tran_date} 
                {tran_id}
            </p>
        </div>
    )
};

PaymentSuccessRow.propTypes = {
    amount: PropTypes.string,
    title: PropTypes.string,
    currency_type: PropTypes.string,
    card_issuer: PropTypes.string,
    tran_date: PropTypes.string,
    tran_id: PropTypes.string
};