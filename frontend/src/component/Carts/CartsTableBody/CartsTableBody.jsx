import { GiCancel } from "react-icons/gi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PropTypes from 'prop-types';
import CartsTableBodySkeleton from '@/components/carts/cart-table-body-skeleton/CartTableBodySkeleton';
import "@/components/carts/style.css";
import { Image } from '@/components/common/image/image';

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


export default CartsTableBody;

const ProductImage = ({ handleDelete, product }) => {
    return (
        <div className="cart-product-image">
            <GiCancel 
                onClick={() =>
                    handleDelete(product._id, product.product_title)
                }
                className="cart-product-delete"
            />
            <Image
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

CartsTableBody.propTypes = {
    loading: PropTypes.bool,
    products: PropTypes.array,
    handleDelete: PropTypes.func,
    quantities: PropTypes.object,
    quantityPlus: PropTypes.func,
    quantityMinus: PropTypes.func,
    subtotals: PropTypes.object
}