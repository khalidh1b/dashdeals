const userRepository = require('../repositories/userRepository');
const { logError } = require('../utils/logger');

class UserService {
    // User profile services
    async saveUser(userData) {
        try {
            // Split name into first and last name
            const name = userData?.name;
            const pattern = /^(.*?)\s+(.*)$/;
            const splitedName = name.match(pattern);
            let firstName, lastName;
            
            if (splitedName) {
                firstName = splitedName[1];
                lastName = splitedName[2];
            } else {
                firstName = name;
                lastName = '';
            }

            const user = { ...userData, firstName, lastName };

            // Check if user already exists
            const existingUser = await userRepository.findUserByEmail(userData.email);
            if (existingUser) {
                return { 
                    success: true, 
                    message: 'user already exists', 
                    user: true,
                    existing: true 
                };
            }

            // Create new user
            const result = await userRepository.createUser(user);
            return { 
                success: true, 
                result,
                message: 'User created successfully' 
            };

        } catch (error) {
            logError('Error saving user', { error: error.message, userData });
            throw new Error('Failed to save user');
        }
    }

    async getUserProfile(email) {
        try {
            const user = await userRepository.findUserByEmail(email);
            if (!user) {
                return { success: false, message: 'User not found' };
            }
            return { success: true, user };
        } catch (error) {
            logError('Error getting user profile', { error: error.message, email });
            throw new Error('Failed to get user profile');
        }
    }

    async updateUserProfile(email, updateData) {
        try {
            const result = await userRepository.updateUser(email, updateData);
            
            if (result.matchedCount === 0) {
                return { success: false, message: 'User not found' };
            }
            
            if (result.modifiedCount === 0) {
                return { success: true, message: 'No changes made to the user profile' };
            }

            return { 
                success: true, 
                result, 
                message: 'User profile updated successfully' 
            };

        } catch (error) {
            logError('Error updating user profile', { error: error.message, email, updateData });
            throw new Error('Failed to update user profile');
        }
    }

    async updatePassword(email, currentPassword, newPassword) {
        try {
            const result = await userRepository.updateUserPassword(email, currentPassword, newPassword);
            
            if (result.matchedCount === 0) {
                return { 
                    success: false, 
                    message: 'Current password not matched' 
                };
            }

            return { 
                success: true, 
                result, 
                message: 'Password updated successfully' 
            };

        } catch (error) {
            logError('Error updating password', { error: error.message, email });
            throw new Error('Failed to update password');
        }
    }

    // Cart services
    async getUserCart(email) {
        try {
            const cart = await userRepository.findUserCart(email);
            return { success: true, cart };
        } catch (error) {
            logError('Error fetching user cart', { error: error.message, email });
            throw new Error('Failed to fetch user cart');
        }
    }

    async addToCart(email, productId, cartItem) {
        try {
            // Check if item already exists in cart
            const existingItem = await userRepository.findCartItem(email, productId);
            if (existingItem) {
                return { 
                    success: false, 
                    message: 'This product already exists in the cart',
                    exists: true 
                };
            }

            const result = await userRepository.addToCart(cartItem);
            return { 
                success: true, 
                result, 
                message: 'Item added to cart successfully' 
            };

        } catch (error) {
            logError('Error adding item to cart', { error: error.message, email, productId });
            throw new Error('Failed to add item to cart');
        }
    }

    async deleteFromCart(email, cartItemId) {
        try {
            const result = await userRepository.deleteFromCart(email, cartItemId);
            
            if (result.deletedCount === 0) {
                return { 
                    success: false, 
                    message: 'No cart found for this email or product' 
                };
            }

            return { 
                success: true, 
                result, 
                message: 'Item deleted successfully' 
            };

        } catch (error) {
            logError('Error deleting item from cart', { error: error.message, email, cartItemId });
            throw new Error('Failed to delete item from cart');
        }
    }

    // Wishlist services
    async getUserWishlist(email) {
        try {
            const wishlist = await userRepository.findUserWishlist(email);
            return { success: true, wishlist };
        } catch (error) {
            logError('Error fetching user wishlist', { error: error.message, email });
            throw new Error('Failed to fetch user wishlist');
        }
    }

    async addToWishlist(email, productId, wishlistItem) {
        try {
            // Check if item already exists in wishlist
            const existingItem = await userRepository.findWishlistItem(email, productId);
            if (existingItem) {
                return { 
                    success: false, 
                    message: 'Wishlist item exists',
                    exists: true 
                };
            }

            const result = await userRepository.addToWishlist(wishlistItem);
            return { 
                success: true, 
                result, 
                message: 'Item added to wishlist successfully' 
            };

        } catch (error) {
            logError('Error adding item to wishlist', { error: error.message, email, productId });
            throw new Error('Failed to add item to wishlist');
        }
    }

    async deleteFromWishlist(email, wishlistItemId) {
        try {
            const result = await userRepository.deleteFromWishlist(email, wishlistItemId);
            return { 
                success: true, 
                result, 
                message: 'Item deleted from wishlist successfully' 
            };

        } catch (error) {
            logError('Error deleting item from wishlist', { error: error.message, email, wishlistItemId });
            throw new Error('Failed to delete item from wishlist');
        }
    }

    // Order services
    async getUserOrders(email) {
        try {
            const orders = await userRepository.findUserOrders(email);
            return { 
                success: true, 
                orders: orders || [],
                message: orders.length > 0 ? 'Orders found' : 'No orders found for this email'
            };

        } catch (error) {
            logError('Error fetching user orders', { error: error.message, email });
            throw new Error('Failed to fetch user orders');
        }
    }
}

module.exports = new UserService();