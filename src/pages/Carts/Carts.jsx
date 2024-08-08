    import { useState, useContext, useEffect } from "react";
    import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
    import { GiCancel } from "react-icons/gi";
    import useAxiosSecure from "../../hooks/useAxiosSecure";
    import { useQuery } from "@tanstack/react-query";
    import { AuthContext } from "../../providers/AuthProvider";
    import Swal from "sweetalert2";
    import { useNavigate } from "react-router-dom";

    const Carts = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [quantities, setQuantities] = useState({});
    const [subtotals, setSubtotals] = useState({});
    const [cartSubtotal, setCartSubtotal] = useState(0);
    const navigate = useNavigate();

    const { data: products = [], refetch } = useQuery({
        queryKey: ["products"],
        queryFn: async () => {
        const res = await axiosSecure.get(`users/userProductCarts/${user.email}`, {
            headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
        });
        const initialQuantities = res.data.reduce(
            (acc, product) => ({ ...acc, [product._id]: 1 }),
            {}
        );
        const initialSubtotals = res.data.reduce((acc, product) => {
            const price = parseFloat(
            (product.discount_price === "$0"
                ? product.main_price
                : product.discount_price
            ).replace(/[^0-9.-]+/g, "")
            );
            return { ...acc, [product._id]: price };
        }, {});
        setQuantities(initialQuantities);
        setSubtotals(initialSubtotals);
        return res.data;
        },
    });

    useEffect(() => {
        const numbers = Object.values(subtotals);
        const result = numbers.reduce((acc, num) => acc + num, 0);
        setCartSubtotal(result);
    }, [subtotals]);

    const handleDelete = (product_id, product_title) => {
        Swal.fire({
        title: `${product_title} will be removed from cart`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Remove",
        }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure
            .delete(`users/userProductCarts/${user.email}/${product_id}`)
            .then((res) => {
                if (res.data.deletedCount > 0) {
                refetch();
                Swal.fire({
                    title: "Removed!",
                    text: `${product_title} has been removed from cart`,
                    icon: "success",
                });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }
        });
    };

    const quantityPlus = (id, quantity, product) => {
        const newQuantity = (quantity || 0) + 1;
        const price = parseFloat(
        (product.discount_price === "$0"
            ? product.main_price
            : product.discount_price
        ).replace(/[^0-9.-]+/g, "")
        );
        const newSubtotal = newQuantity * price;
        setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
        }));
        setSubtotals((prevSubtotals) => ({
        ...prevSubtotals,
        [id]: newSubtotal,
        }));
    };

    const quantityMinus = (id, quantity, product) => {
        const newQuantity = Math.max((quantity || 1) - 1, 1);
        const price = parseFloat(
        (product.discount_price === "$0"
            ? product.main_price
            : product.discount_price
        ).replace(/[^0-9.-]+/g, "")
        );
        const newSubtotal = newQuantity * price;
        setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
        }));
        setSubtotals((prevSubtotals) => ({
        ...prevSubtotals,
        [id]: newSubtotal,
        }));
    };

    const proceedToCheckout = () => {
        const pandey = subtotals;
        const cartData = products;
        const data = { pandey, cartSubtotal, cartData };
        console.log('Navigating to checkout with state:', data);
        navigate('/checkout', { state: data })
    }

    return (
        <div className="pt-24 pb-32">
        <div className="flex justify-center gap-72 border mx-32 py-5 px-5 rounded shadow-md text-base poppins font-normal">
            <p className="w-1/2">Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>
        {products.map((product) => (
            <div
            key={product._id}
            className="flex items-center justify-center border mx-32 mt-9 py-7 rounded shadow-md text-base poppins font-normal px-5"
            >
            <div className="flex items-center gap-4 w-4/12 relative">
                <GiCancel
                onClick={() =>
                    handleDelete(product._id, product.product_title)
                }
                className="absolute text-xl text-red-500 bottom-7 left-9 cursor-pointer"
                />
                <img
                className="w-12 h-10"
                src={product.product_image}
                alt={product.product_title}
                />
                <span>{product.product_title}</span>
            </div>
            <p className="w-3/12">
                {product.discount_price === "$0"
                ? product.main_price
                : product.discount_price}
            </p>
            <div className="w-2/12 pl-10">
                <div className="flex items-center justify-center gap-4 py-1 rounded border-[#000] w-20 border">
                <span>{quantities[product._id]}</span>
                <div>
                    <IoIosArrowUp
                    onClick={() => quantityPlus(product._id, quantities[product._id], product)}
                    />
                    <IoIosArrowDown
                    onClick={() => quantityMinus(product._id, quantities[product._id], product)}
                    />
                </div>
                </div>
            </div>
            <p className="w-3/12 flex justify-end pr-3">
                ${subtotals[product._id]?.toFixed(2)}
            </p>
            </div>
        ))}
        <div className="flex justify-between mx-32 pt-8">
            <button className="text-[#000] poppins text-base font-medium py-3 px-9 border-2 rounded">
            Return To Shop
            </button>
            <button className="text-[#000] poppins text-base font-medium py-3 px-9 border-2 rounded">
            Update Cart
            </button>
        </div>
        <div className="pt-20 flex justify-center gap-44">
            <div className="w-3/2">
            <input
                className="border-2 border-gray-400 rounded py-2.5 pr-10 pl-3"
                type="text"
                placeholder="Coupon Code"
            />
            <button className="bg-[#DB4444] py-3 px-10 ml-3 rounded text-white" type="submit">
                Apply Coupon
            </button>
            </div>
            <div className="border-2 rounded border-[#000] py-7 px-7 w-4/12 poppins text-base font-normal text-[#000]">
            <h3 className="text-xl font-medium pb-5">Cart Total</h3>
            <div className="flex pb-3 justify-between">
                <p>Subtotal:</p><span>${cartSubtotal.toFixed(2)}</span>
            </div>
            <hr className="border-b" />
            <div className="flex justify-between py-4">
                <p>Shipping:</p><span>Free</span>
            </div>
            <hr className="border-[#000]" />
            <div className="flex justify-between py-3">
                <p>Total:</p><span>${cartSubtotal.toFixed(2)}</span>
            </div>
                <button onClick={proceedToCheckout} className="py-3 px-9 bg-[#DB4444] text-white rounded">
                Proceed to checkout
                </button>
            </div>
        </div>
        </div>
    );
    };

    export default Carts;
