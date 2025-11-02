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
    const email = user?.email;
    const navigate = useNavigate();
    const [, refetch] = useCart();
    const queryClient = useQueryClient();


    const handleCart = async (product) => {
        if(!user) {
            navigate('/login');
            return;
        }
        
        const { product_title } = product;
        const _id = null;
        const productId = product._id;
        const info = {...product, email, productId, _id};

        try {
            const res = await axiosSecure.post(`/users/userProductCarts/${productId}/${user?.email}`, info)
    
            if(res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `${product_title} successfully saved on cart`,
                    showConfirmButton: false,
                    timer: 2500
                });
                refetch();
                queryClient.invalidateQueries({ queryKey: ["products", firebaseUser?.email] });

            }
            if(!res.data.insertedId) {
                Swal.fire({
                    icon: "info",
                    title: `${product_title} Already saved on cart`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        } catch (error) {
            console.error('error in usehandlecart.js', error);
        }
    }
    return handleCart;
};

export default useHandleCart;