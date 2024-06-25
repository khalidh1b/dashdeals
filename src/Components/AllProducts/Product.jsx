import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { IoEyeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {AuthContext} from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Product = ({product}) => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const {_id, discount_percent, product_image, product_title, main_price, discount_price, rating, user_rating_count} = product;
    const email = user?.email;

    const [ratings, setRatings] = useState(rating);
    
    const handleWishlist = () => {
        console.log('wishlist clicked')
        const info = {_id, discount_percent, product_image, product_title, main_price, discount_price, rating, user_rating_count, email};
        console.log(info)

        axiosSecure.post('/userProductWishlist', info)
        .then((res) => {
            console.log(res);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src={product_image} alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">{discount_percent}</span>
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-20 left-60 text-[45px] p-2.5 rounded-full"/>
                <FaRegHeart onClick={handleWishlist} className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full cursor-pointer"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">{product_title}</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">{discount_price}</h5><span className="text-gray-500 font-medium line-through text-xl">{main_price}</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">({user_rating_count})</span></div>
            </div>
        </div>
    );
};


Product.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        discount_percent: PropTypes.string.isRequired,
        product_image: PropTypes.string.isRequired,
        product_title: PropTypes.string.isRequired,
        main_price: PropTypes.string.isRequired,
        discount_price: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        user_rating_count: PropTypes.string.isRequired,
    }).isRequired,
};

export default Product;