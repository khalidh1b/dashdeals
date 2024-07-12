const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const {v4: uuidv4} = require('uuid');

//middlewares
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());


//mongodb
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { default: axios } = require('axios');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rpbygkt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const flashSalesProductCollections = client.db('Dashdeals').collection('flashSalesProducts');
        const bestSellingProductCollections = client.db('Dashdeals').collection('bestSellingProducts');
        const exploreOurProductCollections = client.db('Dashdeals').collection('exploreOurProducts');
        const userProductWishlistCollections = client.db('Dashdeals').collection('userProductWishlist');
        const userProductCartCollections = client.db('Dashdeals').collection('userProductCarts');
        const userFeedbackMessageCollections = client.db('Dashdeals').collection('userFeedbackMessage');
        const paymentDataCheckoutCollections = client.db('Dashdeals').collection('paymentDataCheckout');
        const userPaymentsInfoCollections = client.db('Dashdeals').collection('userPaymentsInfo');

        //jwt related apis
        app.post('/jwt', async(req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1h'
            })
            res.send({token});
        })

        //products related apis
        app.get('/flashSalesProducts', async(req, res) => {
            const result = await flashSalesProductCollections.find().toArray();
            res.send(result);
        })

        app.get('/flashSalesProducts/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: new ObjectId(id)};
            const result = await flashSalesProductCollections.findOne(query);
            res.send(result);
        })

        app.get('/bestSellingProducts', async(req, res) => {
            const result = await bestSellingProductCollections.find().toArray();
            res.send(result);
        })

        app.get('/exploreOurProducts', async(req, res) => {
            const result = await exploreOurProductCollections.find().toArray();
            res.send(result);
        })

        //users related apis
        app.post('/userProductWishlist', async(req, res) => {
            const data = req.body;
            const query = {_id: (data._id)};
            const existingWishlistItem = await userProductWishlistCollections.findOne(query);
            console.log(existingWishlistItem);
            if(existingWishlistItem) {
                return res.send({message: 'wishlist item exist', insertedId: null, product_title: data.product_title});
            }
            const result = await userProductWishlistCollections.insertOne(data);
            res.send(result);
        })

        app.get('/userProductWishlist/:email', async(req, res) => {
            const email = req.params.email;
            const query = {email: email};
            const result = await userProductWishlistCollections.find(query).toArray();
            res.send(result);
        })

        app.delete('/userProductWishlist/:email/:id', async(req, res) => {
            const {email, id} = req.params;
            const query = {email: email,_id: (id)};
            const result = await userProductWishlistCollections.deleteOne(query);
            res.send(result);
        })

        app.post('/userProductCarts/:id/:email', async(req, res) => {
            const data = req.body;
            console.log(data)
            const {id, email} = req.params;
            const query = {email: email, _id: (id)};
            const checkCart = await userProductCartCollections.findOne(query);
            if(checkCart) {
                return res.send({message: 'This Product already saved in Carts', insertedId: null});
            }
            const result = await userProductCartCollections.insertOne(data);
            res.send(result);
        })

        app.get('/userProductCarts/:email', async(req, res) => {
            const email = req.params.email;
            const query = {email: email};
            const result = await userProductCartCollections.find(query).toArray();
            res.send(result);
        })

        app.delete('/userProductCarts/:email/:id', async(req, res) => {
            const {email, id} = req.params;
            const query = {email: email, _id: (id)};
            console.log(query);
            const result = await userProductCartCollections.deleteOne(query);
            res.send(result);
        })

        app.post('/userFeedback', async(req, res) => {
            const data = req.body;
            const result = await userFeedbackMessageCollections.insertOne(data);
            res.send(result);
        })

        app.post('/sendDataCheckout', async(req, res) => {
            const data = req.body;
            const result = await paymentDataCheckoutCollections.insertOne(data);
            res.send(result);
        })

        //payment gateway integration
        const backendUrl = "http://localhost:5000";
        app.post('/create-payment', async(req, res) => {
            const paymentInfo = req.body;
            const initiateData = {
                store_id: 'xcorp667d3ec10ce8f',
                store_passwd: 'xcorp667d3ec10ce8f@ssl',
                total_amount: paymentInfo.amount,
                currency: paymentInfo.currency,
                tran_id: uuidv4(),
                success_url: `${backendUrl}/success-payment`,
                fail_url: `${backendUrl}/payment-failed`,
                cancel_url: `${backendUrl}/payment-cancel`,
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
            }

            const responce = await axios({
                method: 'POST',
                url: 'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
                data: initiateData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            console.log(responce);

            const saveData = {
                cus_name: 'dummy',
                paymentId: initiateData.tran_id,
                ammount: paymentInfo.ammount,
                status: 'pending'
            }

            const saved = await userPaymentsInfoCollections.insertOne(saveData);
            if(saved) {
                res.send({
                    paymentUrl: responce.data.GatewayPageURL,
                });
            }
        })

        const clientUrl = "http://localhost:5173";
        app.post('/success-payment', async (req, res) => {
            const successData = req.body;
        
            if (successData.status !== 'VALID') {
                throw new Error('Unauthorized payment');
            }
        
            const query = { paymentId: successData.tran_id };
            const update = {
                $set: {
                    status: "Success"
                }
            };
        
            const updateData = await userPaymentsInfoCollections.updateOne(query, update);
        
            console.log('successData', successData);
            console.log('updatedData', updateData);
        
            // Construct the redirect URL with successData as query parameters
            const redirectUrl = `${clientUrl}/paymentsuccess?tran_id=${successData.tran_id}&card_issuer=${successData.card_issuer}&tran_date=${successData.tran_date}&currency_type=${successData.currency_type}&amount=${successData.amount}&status=Success`;
            res.redirect(redirectUrl);
        });
        

        app.post('/payment-failed', async(req, res) => {
            res.redirect(`${clientUrl}/paymentfailed`);
        })
        app.post('/payment-cancel', async(req, res) => {
            res.redirect(`${clientUrl}/paymentcancel`);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
//mongodb


app.get('/', async(req, res) => {
    res.send('Dash Deals server running here....')
})

app.listen(port, () => {
    console.log(`DashDeal server running on port ${port}`);
})