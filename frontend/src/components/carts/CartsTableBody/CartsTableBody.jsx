import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CartsTableBodySkeleton from '@/components/carts/cart-table-body-skeleton/CartTableBodySkeleton';
import "@/components/Carts/style.css";
import useProceedCheckout from "@/features/cart/hooks/useProceedCheckout";
import useHandleDeleteCart from "@/features/cart/hooks/useHandleDeleteCart";
import ProductImage from '@/components/carts/ProductImage/ProductImage';

const CartsTableBody = () => {
    const handleDelete = useHandleDeleteCart();
    const { 
        loading, 
        products, 
        quantities, 
        quantityMinus, 
        quantityPlus, 
        subtotals 
    } = useProceedCheckout();


    return (
        <>
            { loading ? <CartsTableBodySkeleton/> : products.map((product) => (
                <div
                    key={product?._id}
                    className="carts-table-body poppins"
                >
                <ProductImage handleDelete={handleDelete} product={product}/>
                <p className="md:w-3/12">
                    {product.discount_price === "$0"
                    ? product.main_price
                    : product.discount_price}
                </p>
                <div className="w-2/12 md:pl-10">
                    <div className="cart-table-quantity">
                        <span>{quantities[product._id || product.id]}</span>
                        <div>
                            <IoIosArrowUp
                                onClick={() => quantityPlus(product._id || product.id, quantities[product._id || product.id], product)}
                            />
                            <IoIosArrowDown
                                onClick={() => quantityMinus(product._id || product.id, quantities[product._id || product.id], product)}
                            />
                        </div>
                    </div>
                </div>
                <p className="w-3/12 flex justify-end pr-3">
                    ${subtotals[product._id || product.id]?.toFixed(2)}
                </p>
                </div>
            ))}
        </>
    );
};


export default CartsTableBody;