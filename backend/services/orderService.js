const { client } = require("../config/db.js");

const getCollection = (collectionName) => client.db('Dashdeals').collection(collectionName);

const saveOrderAndPayment = async (data, transactionId) => {
    const saveOrders = {
        paymentId: transactionId,
        amount: data?.cartSubtotal,
        cus_email: data?.cartData[0]?.email || 'guest@example.com',
        status: 'pending',
        delivery_status: 'ongoing',
        orderDate: new Date(),
        products: data?.cartData
    };

    await getCollection('userOrderedProducts').insertOne(saveOrders);

    await getCollection('userPaymentsInfo').insertOne({
        paymentId: saveOrders.paymentId,
        amount: saveOrders.amount,
        cus_email: saveOrders.cus_email,
        status: 'paid',
    });
};

module.exports = { saveOrderAndPayment };