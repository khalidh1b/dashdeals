const { v4: uuidv4 } = require('uuid');
const { saveOrderAndPayment } = require('../services/orderService.js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//console.log(process.env.STRIPE_SECRET_KEY);

exports.createPayment = async (req, res) => {
    //console.log('Creating payment session...', req.body);
    const { data } = req.body;

    if (!data || !data.cartData || !data.quantities) {
        return res.status(400).json({ error: 'Missing required data: cartData and quantities are required' });
    }

    try {
        const origin = req.headers.origin || req.headers.referer || process.env.CLIENT_URL || 'http://localhost:5173' || 'http://localhost:4173';
        
        const lineItems = data.cartData.map((item) => {
            const price = parseFloat(item.main_price?.replace('$', '') || '0');
            if (isNaN(price) || price <= 0) {
                throw new Error(`Invalid price for product ${item.product_title}: ${item.main_price}`);
            }
            
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.product_title || 'Unknown Product',
                        images: item.product_image ? [item.product_image] : [],
                    },
                    unit_amount: Math.round(price * 100),
                },
                quantity: data.quantities[item._id] || 1,
            };
        });

        const transactionId = uuidv4();
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${origin}/paymentsuccess?amount=${data.cartSubtotal || 0}&tran_id=${transactionId}`, 
            cancel_url: `${origin}/paymentcancel`,
            metadata: {
                transaction_id: transactionId,
                user_id: data.userId || 'guest'
            }
        });

        // Save order and payment data
        await saveOrderAndPayment(data, transactionId);
        
        //console.log('Checkout session created successfully:', session.id);
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ 
            error: 'Error creating checkout session',
            details: error.message 
        });
    }
};
