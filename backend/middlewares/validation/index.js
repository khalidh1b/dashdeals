const { validate } = require('./core/genericValidator');
const { validateEmail } = require('./auth/emailValidator');
const { validateUserData } = require('./auth/userValidator');
const { validatePasswordUpdate } = require('./auth/passwordValidator');
const { validateCartItem } = require('./ecommerce/cartValidator');
const { validateWishlistItem } = require('./ecommerce/wishlistValidator');
const { validateOrderDeletion, validateBatchOrderDeletion } = require('./ecommerce/orderValidator');
const { validateAdminAccess } = require('./auth/adminValidator');
const { validateObjectId } = require('./core/objectIdValidator');

module.exports = {
    validate,
    
    validateEmail,
    validateUserData,
    validatePasswordUpdate,
    validateAdminAccess,
    
    validateCartItem,
    validateWishlistItem,
    validateOrderDeletion,
    validateBatchOrderDeletion,
    
    validateObjectId
};