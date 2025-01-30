import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";

const useDeleteOrder = (setLoadingProducts, refetch) => {
    const axiosSecure = useAxiosSecure();

    const handleDeleteProduct = async (orderId, productId) => {
        console.log(orderId, productId);

        try {
            setLoadingProducts((prevState) => ({
                ...prevState,
                [productId]: true,
            }))
            await axiosSecure.delete(`/users/deleteOrderedProduct/${orderId}/${productId}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`,
                }
            })
            refetch()
            .then((result) => {
                console.log(result);
                if(result.status === 'success') {
                    Swal.fire({
                        icon: "success",
                        title: "Product deleted successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            })
            setLoadingProducts((prevState) => ({
                ...prevState,
                [productId]: false,
            }))
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
    return handleDeleteProduct;
};

export default useDeleteOrder;