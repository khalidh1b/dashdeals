import { client } from "../config/db.js";

const getCollection = (collectionName) => client.db('Dashdeals').collection(collectionName);

export const saveOrderAndPayment = async (data, uuidv4) => {
    const saveOrders = {
        paymentId: uuidv4(),
        amount: data?.cartSubtotal,
        cus_email: data?.cartData[0].email,
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