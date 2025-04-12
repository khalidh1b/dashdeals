import { getUrlParameter } from "./getUrlParameter";

export const getPaymentSuccessParams = () => {
    // Usage
    const tran_id = getUrlParameter('tran_id');
    const card_issuer = getUrlParameter('card_issuer');
    const tran_date = getUrlParameter('tran_date');
    const currency_type = getUrlParameter('currency_type');
    const amount = getUrlParameter('amount');

    return { tran_id, card_issuer, tran_date, currency_type, amount }; 
};