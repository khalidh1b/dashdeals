import Swal from "sweetalert2";
import useAxiosSecure from "@/hooks/access/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "@/providers/auth-provider";
import useFetchWishlist from "@/hooks/wishlist/useFetchWishlist";

const useHandleDeleteWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);
    const [, refetch] = useFetchWishlist();

    const handleDelete = (product_id, product_title) => {
        console.log('handle delete', product_id);

        Swal.fire({
            title: `Remove ${product_title} from wishlist`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove"
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/users/deleteUserProductWishlist/${user?.email}/${product_id}`)
                    .then((res) => {
                        console.log(res);
                        refetch();
                        if(res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Removed!",
                                text: `${product_title} has been removed.`,
                                icon: "success"
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                }
            });
    }
    return handleDelete;
};

export default useHandleDeleteWishlist;