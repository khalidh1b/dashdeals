import Swal from "sweetalert2";
import { validateProductObject, validateCartItemId, logValidationError } from "@/shared/utils/validationHelpers";

export const useProductImageLogic = (handleDelete, product) => {
    const handleDeleteClick = () => {

        const productValidation = validateProductObject(product);
        if (!productValidation.isValid) {
            logValidationError('PRODUCT_IMAGE_DELETE', productValidation.error, {
                product,
                component: 'ProductImage'
            });
            
            Swal.fire({
                title: "Error",
                text: "Cannot remove item: Invalid product data.",
                icon: "error",
                showConfirmButton: true,
            });
            return;
        }

        const cartItemId = product._id || product.id || product.cartItemId || product.productId;
        
        console.log('🔍 DEBUG: Available ID fields for deletion:', {
            _id: product._id,
            id: product.id, 
            cartItemId: product.cartItemId,
            productId: product.productId,
            selectedId: cartItemId
        });
        
        const cartIdValidation = validateCartItemId(cartItemId);
        
        if (!cartIdValidation.isValid) {
            logValidationError('CART_ITEM_ID_DELETE', cartIdValidation.error, {
                cartItemId,
                product,
                component: 'ProductImage',
                allFields: {
                    _id: product._id,
                    id: product.id, 
                    cartItemId: product.cartItemId,
                    productId: product.productId
                }
            });
            
            Swal.fire({
                title: "System Error",
                text: "Cannot remove item: Invalid cart identifier. Please refresh the page and try again.",
                icon: "error",
                showConfirmButton: true,
            });
            return;
        }

        console.log('🗑️ Deleting cart item with ID:', cartIdValidation.sanitizedId, 'for product:', product.product_title);
        handleDelete(cartIdValidation.sanitizedId, product.product_title || 'Unknown Product');
    };

    return {
        handleDeleteClick
    };
};