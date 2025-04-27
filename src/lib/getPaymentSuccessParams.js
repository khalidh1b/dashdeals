import { getUrlParameter } from "./getUrlParameter";

export const getPaymentSuccessParams = () => {

    const tran_id = getUrlParameter('tran_id');
    const amount = getUrlParameter('amount');

    return { tran_id, amount }; 
};