import PropTypes from 'prop-types';
import { Image } from '@/components/common/image/image';
import { Trash2 } from "lucide-react";
import { useProductImageLogic } from '@/features/cart/hooks/useProductImageLogic';

const ProductImage = ({ handleDelete, product }) => {
    const { handleDeleteClick } = useProductImageLogic(handleDelete, product);

    return (
        <div className="cart-product-image group">
            <div className="absolute -bottom-4 -left-14 z-10 group-hover:block hidden">
                <Trash2 
                    onClick={handleDeleteClick}
                    className="cart-product-delete w-5 h-5" 
                />
            </div>
            <Image
                className="w-12 h-10"
                src={product?.product_image || ''}
                alt={product?.product_title || 'Product'}
            />
            <span className="md:block hidden">{product?.product_title || 'Unknown Product'}</span>
        </div>
    )
};

ProductImage.propTypes = {
    handleDelete: PropTypes.func,
    product: PropTypes.object
};

export default ProductImage;