import Swal from "sweetalert2";
import useAxiosSecure from "@/shared/hooks/useAxiosSecure";
import useCart from "@/features/cart/hooks/useCart";
import { AuthContext } from "@/app/providers/auth-provider";
import { useContext } from "react";

const useHandleDeleteCart = (refetchCartData) => {
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    const { user } = useContext(AuthContext);

    const handleDelete = async (product_id, product_title) => {
        try {
            await Swal.fire({
            title: `${product_title} will be removed from cart`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove",
            }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/userProductCarts/${user?.email}/${product_id}`)
                .then((res) => {
                    if (res.data.deletedCount > 0) {
                    refetch();
                    refetchCartData()
                    Swal.fire({
                        title: "Removed!",
                        text: `${product_title} has been removed from cart`,
                        icon: "success",
                    });
                    }
                })
            }
            });
        } catch (error) {
            Swal.fire({
                    icon: "error",
                    title: error.message || 'An Unexpected Error Occured, Try Again!',
                    showConfirmButton: false,
                    timer: 2500
                });
            //console.log(error);
        }
    };
    
    return handleDelete;
};

export default useHandleDeleteCart;