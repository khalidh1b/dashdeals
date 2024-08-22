const {client} = require('../config/db.js');
const {ObjectId} = require('mongodb');

const getCollection = (collectionName) => client.db('Dashdeals').collection(collectionName);

exports.addUserProductWishlist = async (req, res) => {
    const data = req.body;
    const collection = getCollection('userProductWishlist');
    const existingWishlistItem = await collection.findOne({ _id: data._id });
    if (existingWishlistItem) {
        return res.send({ message: 'Wishlist item exists', insertedId: null, product_title: data.product_title });
    }
    const result = await collection.insertOne(data);
    res.send(result);
};

exports.getUserProductCarts = async (req, res) => {
    try {
        const email = req.params.email;
        const collection = getCollection('userProductCarts');
        const query = {email: email};
        const result = await collection.find(query).toArray();

        if(result.length === 0) {
            return res.status(404).send({message: 'No carts found for this email'})
        }
        res.send(result);
    } catch (error) {
        console.error('Error fetching user product carts', error);
        res.status(500).send({message: 'An error occurred fetching user carts'});
    }
};

exports.addUserProductCarts = async (req, res) => {
    try {
        const data = req.body;
        const {id, email} = req.params;
        const collection = getCollection('userProductCarts');
        const query = {email: email, _id: id};

        //Check if cart exists for this user
        const existingCartItem = await collection.findOne(query);
        if(existingCartItem) {
            return res.send({message: 'This product already exists in the cart', insertedId: null})
        }

        //Insert the new product into the cart
        const result = await collection.insertOne(data);
        res.send(result);
    } catch (error) {
        console.error('Error adding item to cart', error);
        res.status(500).send({message: 'An error occurred while adding item to cart'});
    }
};

exports.deleteUserProductCarts = async (req, res) => {
    try {
        const {email, id} = req.params;
        const collection = getCollection('userProductCarts');
        const query = {email: email, _id: id};

        //Debug: Log the query to see what is being sent
        // console.log('Deleting item with query:', query);

        //Perform the delete operation
        const result = await collection.deleteOne(query);

        if(result.deletedCount === 0) {
            return res.status(404).send({message: 'No cart found for this email or product'})
        }
        res.send({message: 'Item deleted successfully', deletedCount: result.deletedCount });
    } catch (error) {
        console.error('Error deleting item from cart', error);
        res.status(500).send({message: 'An error occurred while deleting item from cart'});
    }
};

exports.getUserOrderedProducts = async (req, res) => {
    try {
        const email = req.params.email;
        const query = {cus_email: email};

        const orders = await getCollection('userOrderedProducts').find(query).toArray();
        if(orders) {
            res.json(orders);
        }
        else {
            res.status(404).json({message: 'No orders found for this email'});
        }
    } catch (error) {
        console.error('Error fetching user ordered products', error);
        res.status(500).json({message: 'An error occurred fetching user ordered products'});
    }
}

exports.deleteOrderedProduct = async (req, res) => {
    try {
        const {orderId, productId} = req.params;
        const query =  {_id: new ObjectId(orderId)}
        console.log(orderId, productId, query);

        const order = await getCollection('userOrderedProducts').findOne(query);
        console.log(order);
        
        const updatedProducts = await order.products.filter((product) => product._id !== (productId));

        if(updatedProducts.length === 0) {
            console.log('this order should be delete',order);
            const result = await getCollection('userOrderedProducts').deleteOne(query);
            console.log('order deleted:', result);
        }

        await getCollection('userOrderedProducts').updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { products: updatedProducts } }
        );

        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        console.error('Error deleting ordered product', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

exports.deleteUserProductWishlist = async (req, res) => {
    const {email, productId} = req.params;
    const query = {email: email, _id: (productId)};

    const result = await getCollection('userProductWishlist').deleteOne(query);

    res.send(result);
}

exports.getUserProductWishlist = async (req, res) => {
    const email = req.params.email;
    const query = {email: email};

    const wishlist = await getCollection('userProductWishlist').find(query).toArray();
    res.send(wishlist);
}

// Repeat similar functions for other user-related routes
