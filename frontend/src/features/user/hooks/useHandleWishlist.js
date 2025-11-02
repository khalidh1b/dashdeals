import { useContext } from "react";
import useAxiosSecure from "@/shared/hooks/useAxiosSecure";
import { AuthContext } from "@/app/providers/auth-provider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const useHandleWishlist = (product) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const email = user?.email;
    const navigate = useNavigate();

    const handleWishlist = async (product_title) => {
        if(!user) {
            navigate('/login');
            return;
        };

        const wishlisted = true;
        const productId = product._id
        const _id = null;

        // //console.log(product_title)
        const info = {...product, product_title, email, wishlisted, productId, _id};

        try {
            const res = await axiosSecure.post('/users/userProductWishlist', info)
            // //console.log(res);
            if(!res?.data?.insertedId) {
                Swal.fire({
                    icon: "info",
                    title: `${res.data?.product_title || product_title} already available in wishlist`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
            if(res.data?.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `${product_title} added in your wishlist`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: error.message || 'Unexpected Error Occured, Try Again!',
                showConfirmButton: false,
                timer: 2500
            });
            //console.log(error);
            if(error.message === 'No token found') {
                navigate('/login');
            };
        }
    }
    return handleWishlist;
};

export default useHandleWishlist;