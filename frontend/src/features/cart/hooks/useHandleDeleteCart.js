import Swal from "sweetalert2";
import useAxiosSecure from "@/shared/hooks/useAxiosSecure";
import useCart from "@/features/cart/hooks/useCart";
import { AuthContext } from "@/app/providers/auth-provider";
import { useContext } from "react";
import useFetchCartData from "./useFetchCartData";
import { validateCartItemId, validateUserAuth, logValidationError } from "@/shared/utils/validationHelpers";

const useHandleDeleteCart = () => {
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const { user } = useContext(AuthContext);
    const [, , , refetchCartData] = useFetchCartData();

    const handleDelete = async (product_id, product_title) => {
        console.log('🔍 DEBUG: Delete called with:', {
            product_id,
            product_title,
            product_id_type: typeof product_id,
            user_email: user?.email
        });
        
        // PRODUCTION SAFETY: Validate cart item ID (MongoDB ObjectId) 
        const cartIdValidation = validateCartItemId(product_id);
        
        if (!cartIdValidation.isValid) {
            logValidationError('CART_DELETE_ID', cartIdValidation.error, {
                product_id,
                product_title,
                user_email: user?.email,
                validation_type: 'cart_item_id'
            });
            
            Swal.fire({
                title: "System Error",
                text: "Invalid cart item identifier. Please refresh the page and try again.",
                icon: "error",
                showConfirmButton: true,
            });
            return;
        }

        // Validate user authentication
        const userValidation = validateUserAuth(user);
        if (!userValidation.isValid) {
            logValidationError('CART_DELETE_AUTH', userValidation.error, {
                product_id,
                user_email: user?.email,
                validation_type: 'user_auth'
            });
            
            Swal.fire({
                title: "Authentication Error",
                text: "Please log in to remove items from cart.",
                icon: "error",
                showConfirmButton: true,
            });
            return;
        }

        const sanitizedCartItemId = cartIdValidation.sanitizedId;
        const sanitizedProductTitle = String(product_title || 'Unknown Product').trim();

        try {
            await Swal.fire({
            title: `${sanitizedProductTitle} will be removed from cart`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Remove",
            }).then((result) => {
            if (result.isConfirmed) {
                // Double-check validation before API call
                if (!sanitizedCartItemId || !user?.email) {
                    console.error('CRITICAL: Validation failed before API call');
                    Swal.fire({
                        title: "System Error",
                        text: "Unable to process delete request. Please try again.",
                        icon: "error",
                        showConfirmButton: true,
                    });
                    return;
                }

                console.log('🚀 Making API call to delete cart item:', sanitizedCartItemId);
                axiosSecure.delete(`/users/userProductCarts/${user.email}/${sanitizedCartItemId}`)
                .then((res) => {
                    console.log('Delete response:', res);
                    // Handle different response structures
                    const responseData = res.data || res;
                    
                    if (responseData && (responseData.deletedCount > 0 || responseData.success)) {
                    refetch();
                    refetchCartData()
                    Swal.fire({
                        title: "Removed!",
                        text: `${sanitizedProductTitle} has been removed from cart`,
                        icon: "success",
                    });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: responseData?.message || "Failed to remove item from cart",
                            icon: "error",
                        });
                    }
                })
                .catch((apiError) => {
                    console.error('API Error:', apiError);
                    Swal.fire({
                        title: "API Error",
                        text: apiError.response?.data?.message || "Failed to communicate with server",
                        icon: "error",
                        showConfirmButton: true,
                    });
                });
            }
            });
        } catch (error) {
            console.error('Delete error:', error);
            Swal.fire({
                    icon: "error",
                    title: error.response?.data?.message || error.message || 'An Unexpected Error Occurred, Try Again!',
                    showConfirmButton: false,
                    timer: 2500
                });
        }
    };
    
    return handleDelete;
};

export default useHandleDeleteCart;
