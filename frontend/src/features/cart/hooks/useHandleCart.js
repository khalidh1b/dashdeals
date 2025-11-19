import { useContext } from "react";
import { AuthContext } from "@/app/providers/auth-provider";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "@/shared/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "@/features/cart/hooks/useCart";
import { useQueryClient } from "@tanstack/react-query";

const useHandleCart = () => {
    const { user: firebaseUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const email = firebaseUser?.email;
    const navigate = useNavigate();
    const [, refetch] = useCart();
    const queryClient = useQueryClient();


    const handleCart = async (product) => {
        if(!firebaseUser) {
            navigate('/login');
            return;
        }
        
        const { product_title } = product;
        const _id = null;
        const productId = product?._id || product?.id;
        
        // Validate productId before making API call
        if (!productId) {
            console.error('Product ID is missing:', product);
            Swal.fire({
                icon: "error",
                title: "Invalid product data",
                text: "Unable to add product to cart. Please try again.",
                showConfirmButton: false,
                timer: 2500
            });
            return;
        }
        
        const info = {...product, email, productId, _id};

        console.log(productId);
        try {
            const res = await axiosSecure.post(`/users/userProductCarts/${productId}/${firebaseUser?.email}`, info)
    
            if(res.data?.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `${product_title} successfully saved on cart`,
                    showConfirmButton: false,
                    timer: 2500
                });
                refetch();
                queryClient.invalidateQueries({ queryKey: ["products", firebaseUser?.email] });
            } else {
                // Handle case where product already exists in cart
                Swal.fire({
                    icon: "info",
                    title: `${product_title} Already saved on cart`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        } catch (error) {
            console.error('error in usehandlecart.js', error);
            
            let errorMessage = 'Unexpected Error Occurred, Try Again!';
            
            // Handle different types of errors
            if (error.response) {
                // Backend validation error
                if (error.response.data && error.response.data.error) {
                    errorMessage = error.response.data.error;
                } else if (error.response.status === 400) {
                    errorMessage = 'Invalid product data. Please check the product information.';
                } else if (error.response.status === 401) {
                    errorMessage = 'Authentication required. Please login again.';
                } else if (error.response.status === 500) {
                    errorMessage = 'Server error. Please try again later.';
                }
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            Swal.fire({
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                timer: 2500
            });
            
            if(error.message === 'No token found' || (error.response && error.response.status === 401)) {
                navigate('/login');
            }
        }
    }
    return handleCart;
};

export default useHandleCart;