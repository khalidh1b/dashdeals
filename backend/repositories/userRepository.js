const { client } = require('../config/db.js');
const { ObjectId } = require('mongodb');

const getCollection = (collectionName) => client.db('Dashdeals').collection(collectionName);

class UserRepository {
    constructor() {
        this.collections = {
            users: getCollection('saved-user'),
            carts: getCollection('userProductCarts'),
            wishlist: getCollection('userProductWishlist'),
            orders: getCollection('userOrderedProducts')
        };
    }

    // User operations
    async findUserByEmail(email) {
        return await this.collections.users.findOne({ email });
    }

    async createUser(userData) {
        return await this.collections.users.insertOne(userData);
    }

    async updateUser(email, updateData) {
        return await this.collections.users.updateOne(
            { email },
            { $set: updateData }
        );
    }

    async updateUserPassword(email, currentPassword, newPassword) {
        const query = { email, password: currentPassword };
        const update = { $set: { password: newPassword } };
        return await this.collections.users.updateOne(query, update);
    }

    // Cart operations
    async findUserCart(email) {
        return await this.collections.carts.find({ email }).toArray();
    }

    async findCartItem(email, productId) {
        return await this.collections.carts.findOne({ email, productId });
    }

    async addToCart(cartItem) {
        return await this.collections.carts.insertOne(cartItem);
    }

    async deleteFromCart(email, cartItemId) {
        const query = { email, _id: new ObjectId(cartItemId) };
        return await this.collections.carts.deleteOne(query);
    }

    // Wishlist operations
    async findUserWishlist(email) {
        return await this.collections.wishlist.find({ email }).toArray();
    }

    async findWishlistItem(email, productId) {
        return await this.collections.wishlist.findOne({ email, productId });
    }

    async addToWishlist(wishlistItem) {
        return await this.collections.wishlist.insertOne(wishlistItem);
    }

    async deleteFromWishlist(email, wishlistItemId) {
        const query = { email, _id: new ObjectId(wishlistItemId) };
        return await this.collections.wishlist.deleteOne(query);
    }

    // Order operations
    async findUserOrders(email) {
        return await this.collections.orders.find({ cus_email: email }).toArray();
    }
}

module.exports = new UserRepository();