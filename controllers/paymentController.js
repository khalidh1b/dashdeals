const { v4: uuidv4 } = require('uuid');
const { saveOrderAndPayment } = require('../services/orderService.js');
const stripe = require('stripe')(process.env.Stripe_Secret_Key);

exports.createPayment = async (req, res) => {

    console.log(req.body);
    const { data } = req.body;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: data.cartData.map((item) => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product_title,
                    },
                    unit_amount: parseInt(item.main_price.replace('$', '') * 100, 10),
                },
                quantity: data.quantities[item._id] || 1,
            })),
            mode: 'payment',
            success_url: `${req.headers.origin}/paymentsuccess?amount=${1200}&tran_id=${uuidv4()}`, 
            cancel_url: `${req.headers.origin}/paymentcancel`
        });

        await saveOrderAndPayment(data, uuidv4);
        
        res.json({ id: session.id });
    } catch (error) {
        console.log('Error creating checkout session', error);
        res.status(500).json({ error: 'Error creating checkout session' })
    }
};