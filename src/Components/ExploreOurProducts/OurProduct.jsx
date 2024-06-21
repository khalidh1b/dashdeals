import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import PropTypes from 'prop-types';


const OurProduct = ({product}) => {
    const { product_image, product_title, main_price, rating, user_rating_count} = product;

    const [ratings, setRatings] = useState(rating);
    return (
        <div>
            <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src={product_image} alt="G92 Gamepad" />
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-20 left-60 text-[45px] p-2.5 rounded-full"/>
                <FaRegHeart className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-[300px] text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">{product_title}</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">{main_price}</h5></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">({user_rating_count})</span></div>
        </div>
    );
};



OurProduct.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        product_image: PropTypes.string.isRequired,
        product_title: PropTypes.string.isRequired,
        main_price: PropTypes.string.isRequired,
        discount_price: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        user_rating_count: PropTypes.string.isRequired,
    }).isRequired,
};


export default OurProduct;