import { GiCancel } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PropTypes from 'prop-types';
import CartsTableBodySkeleton from '@/components/carts/cart-table-body-skeleton/CartTableBodySkeleton';

const CartsTableBody = ({ 
    loading, 
    products, 
    handleDelete, 
    quantities, 
    quantityPlus, 
    quantityMinus, 
    subtotals 
}) => {
    return (
        <>
            { loading ? <CartsTableBodySkeleton/> : products.map((product) => (
        <div
        key={product._id}
        className="flex items-center md:justify-center justify-between border md:mx-32 mt-9 py-7 rounded shadow-md text-base poppins font-normal px-5"
        >
        <ProductImage handleDelete={handleDelete} product={product}/>
        <p className="md:w-3/12">
            {product.discount_price === "$0"
            ? product.main_price
            : product.discount_price}
        </p>
        <div className="w-2/12 md:pl-10">
            <div className="flex items-center justify-center gap-4 py-1 rounded border-black w-20 border">
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
        </>
    );
};

CartsTableBody.propTypes = {
    loading: PropTypes.bool,
    products: PropTypes.array,
    handleDelete: PropTypes.func,
    quantities: PropTypes.object,
    quantityPlus: PropTypes.func,
    quantityMinus: PropTypes.func,
    subtotals: PropTypes.object
}

export default CartsTableBody;

const ProductImage = ({ handleDelete, product }) => {
    return (
        <div className="flex items-center gap-4 md:w-4/12 relative">
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
            <span className="md:block hidden">{product.product_title}</span>
        </div>
    )
};

ProductImage.propTypes = {
    handleDelete: PropTypes.func,
    product: PropTypes.object
};