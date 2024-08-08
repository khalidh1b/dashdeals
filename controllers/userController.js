const {client} = require('../config/db.js');

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

// Repeat similar functions for other user-related routes
