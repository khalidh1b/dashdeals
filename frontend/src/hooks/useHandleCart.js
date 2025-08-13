import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "./useAxiosSecure";
import Swal from "sweetalert2";
import useCart from "./useCart";

const useHandleCart = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const email = user?.email;
    const navigate = useNavigate();
    const [, refetch] = useCart();

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