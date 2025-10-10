import { useContext } from "react";
import useAxiosSecure from "@/hooks/access/useAxiosSecure";
import { AuthContext } from "@/providers/auth-provider";
import Swal from "sweetalert2";

const useHandleWishlist = (product) => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const email = user?.email;

    const handleWishlist = async (product_title) => {
        const wishlisted = true;
        const productId = product._id
        const _id = null;

        // console.log(product_title)
        const info = {...product, product_title, email, wishlisted, productId, _id};

        try {
            const res = await axiosSecure.post('/users/userProductWishlist', info)
            // console.log(res);
            if(!res?.data?.insertedId) {
                Swal.fire({
                    icon: "info",
                    title: `${res.data.product_title} already available in wishlist`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
            if(res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `${product_title} added in your wishlist`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return handleWishlist;
};

export default useHandleWishlist;