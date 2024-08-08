const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const {client} = require('../config/db.js');
const { backendUrl, clientUrl } = require('../config/config.js');

const getCollection = (collectionName) => client.db('Dashdeals').collection(collectionName);

exports.createPayment = async (req, res) => {
    const paymentInfo = req.body;
    const initiateData = {
        store_id: 'xcorp667d3ec10ce8f',
        store_passwd: 'xcorp667d3ec10ce8f@ssl',
        total_amount: paymentInfo.amount,
        currency: paymentInfo.currency,
        tran_id: uuidv4(),
        success_url: `${backendUrl}/payments/success-payment`,
        fail_url: `${backendUrl}/payments/payment-failed`,
        cancel_url: `${backendUrl}/payments/payment-cancel`,
        cus_name: 'Customer Name',
        cus_email: 'cust@yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        shipping_method: 'NO',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: '1000',
        ship_country: 'Bangladesh',
        product_name: 'Laptop',
        product_category: 'Laptop',
        product_profile: 'general',
        multi_card_name: 'mastercard,visacard,amexcard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };

    try {
        const response = await axios.post('https://sandbox.sslcommerz.com/gwprocess/v4/api.php', initiateData, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        
        const saveData = {
            cus_name: 'dummy',
            paymentId: initiateData.tran_id,
            amount: paymentInfo.amount,
            cus_email: paymentInfo.cus_email,
            status: 'pending',
            delivery_status: 'pending'
        };

        const orderProductsData = paymentInfo?.productId;
        await getCollection('userOrderedProducts').insertMany(orderProductsData);
        await getCollection('userPaymentsInfo').insertOne(saveData);

        res.send({ paymentUrl: response.data.GatewayPageURL });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).send('Payment creation failed');
    }
};

exports.handleSuccessPayment = async (req, res) => {
    console.log('I am here for Handling success payment...');
    try {
        const successData = req.body;

        // Check if the payment status is valid
        if (successData.status !== 'VALID') {
            return res.status(400).send({ message: 'Unauthorized payment' });
        }

        const userPaymentsCollection = getCollection('userPaymentsInfo');
        const query = { paymentId: successData.tran_id };
        const update = {
            $set: {
                status: "Success"
            }
        };

        // Update the payment status
        const updateResult = await userPaymentsCollection.updateOne(query, update);

        // Debugging logs
        console.log('Success Data:', successData);
        console.log('Update Result:', updateResult);

        // Construct the redirect URL with successData as query parameters
        const redirectUrl = `${clientUrl}/paymentsuccess?tran_id=${successData.tran_id}&card_issuer=${successData.card_issuer}&tran_date=${successData.tran_date}&currency_type=${successData.currency_type}&amount=${successData.amount}&status=Success`;

        // Redirect the client
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error handling success payment:', error);
        res.status(500).send({ message: 'An error occurred while processing the payment' });
    }
};

exports.handlePaymentFailed = async (req, res) => {
    try {
        // Construct the redirect URL
        const redirectUrl = `${clientUrl}/paymentfailed`;
        
        // Redirect the client
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error handling failed payment:', error);
        res.status(500).send({ message: 'An error occurred while processing the failed payment' });
    }
};

exports.handlePaymentCancel = async (req, res) => {
    try {
        // Construct the redirect URL
        const redirectUrl = `${clientUrl}/paymentcancel`;
        
        // Redirect the client
        res.redirect(redirectUrl);
    } catch (error) {
        console.error('Error handling cancel payment:', error);
        res.status(500).send({ message: 'payment canceled by the user' });
    }
};

// Repeat similar functions for other payment-related routes
