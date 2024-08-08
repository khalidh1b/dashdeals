import { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { Rating } from "@smastrom/react-rating";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BestSellingProduct = ({product}) => {
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {_id, discount_percent, product_image, product_title, main_price, discount_price, rating, user_rating_count} = product;

    const [ratings, setRatings] = useState(rating);
    const email = user?.email;

    const handleWishlist = (product_title) => {
        console.log('wishlist clicked')
        const wishlisted = true;

        const info = {_id, discount_percent, product_image, product_title, main_price, discount_price, rating, user_rating_count, email, wishlisted};
        console.log(info)

        axiosSecure.post('/userProductWishlist', info)
        .then((res) => {
            console.log(res);
            if(!res.data.insertedId) {
                Swal.fire({
                    icon: "info",
                    title: `${res.data.product_title} already available in wishlist`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
            if(res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `${product_title} added in your wishlist`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }


    const handleCart = (_id, product_title) => {
        if(!user) {
            navigate('/login');
            return;
        }

        const info = {_id, discount_percent, product_image, product_title, main_price, discount_price, rating, user_rating_count, email};

        console.log('clicking...', _id);
        axiosSecure.post(`users/userProductCarts/${_id}/${user.email}`, info)
        .then((res) => {
            console.log(res);
            if(res.data.insertedId) {
                Swal.fire({
                    icon: "success",
                    title: `${product_title} successfully saved on cart`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
            if(!res.data.insertedId) {
                Swal.fire({
                    icon: "info",
                    title: `${product_title} Already saved on cart`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }


    return (
        <div>
            <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src={product_image} alt="G92 Gamepad" />
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-20 left-60 text-[45px] p-2.5 rounded-full"/>
                <FaRegHeart onClick={() => handleWishlist(product_title)} className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full cursor-pointer"/>
                <p onClick={() => handleCart(_id, product_title)} className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b cursor-default">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">{product_title}</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">{discount_price === '$0' ? main_price : discount_price}</h5><span className="text-gray-500 font-medium line-through text-xl">{discount_price !== '$0' && main_price}</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">({user_rating_count})</span></div>
        </div>
    );
};


BestSellingProduct.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        _id: PropTypes.string.isRequired,
        discount_percent: PropTypes.string,
        product_image: PropTypes.string.isRequired,
        product_title: PropTypes.string.isRequired,
        main_price: PropTypes.string.isRequired,
        discount_price: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        user_rating_count: PropTypes.string.isRequired,
    }).isRequired,
};


export default BestSellingProduct;