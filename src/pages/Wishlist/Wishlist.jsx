import { Rating } from "@smastrom/react-rating";
import { useContext, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBinLine } from "react-icons/ri";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';
import {useQuery} from '@tanstack/react-query';


const Wishlist = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext);

    const {data: products = [], refetch} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/userProductWishlist/${user.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('access-token')}`
                }
            })
            return res.data;
        }
    })

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
                    axiosSecure.delete(`/userProductWishlist/${user.email}/${product_id}`)
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
    const [ratings, setRatings] = useState(20);

    const handleCart = (_id, discount_percent, product_image, product_title, main_price, discount_price, rating, user_rating_count) => {
        
        const email = user?.email;

        const info = {_id, discount_percent, product_image, product_title, main_price, discount_price, rating, user_rating_count, email};

        console.log('clicking...', _id);
        axiosSecure.post(`/userProductCarts/${_id}/${user.email}`, info)
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
        <div className="pt-20 pb-28">
            <div className="flex justify-between items-center mx-32">
                <p>Wishlist<span> ({products.length})</span></p>
                <button className="text-[#000] poppins text-base font-medium py-3 px-10 border border-[#000] rounded">Move All To Bag</button>
            </div>

            <div className="grid justify-start grid-cols-3  gap-8 pt-10 mx-32">
            {
                products.map(product => <div key={product._id}>
                    <div className="relative">
                    <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src={product.product_image} />
                    <span className={`bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins ${!product.discount_percent && 'hidden'}`}>{product.discount_percent}</span>
                    <RiDeleteBinLine onClick={() => handleDelete(product._id, product.product_title)} className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full cursor-pointer"/>
                    <p onClick={() => handleCart(product._id, product.discount_percent, product.product_image, product.product_title, product.main_price, product.discount_price, product.rating, product.user_rating_count)} className="bg-[#000000] absolute bottom-0 w-[300px] text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b cursor-pointer">Add To Cart</p>
                    </div>
                    <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">{product.product_title}</h4>
                    <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">{product.discount_price === '$0' ? product.main_price : product.discount_price}</h5><span className="text-gray-500 font-medium line-through text-xl">{!product.discount_price === '$0' && product.main_price}</span></div>
                </div>)
            }
            </div>

            <div className="flex justify-between gap-5 mx-20 py-24">
                <div className="flex text-[#DB4444] items-center gap-3 font-semibold">
                    <div className="bg-[#DB4444] rounded py-5 px-2"></div>
                    Just For You
                </div>
                <button className="py-3 px-12 text-[#000] poppins text-base font-medium rounded border-2">See All</button>
            </div>


            <div className="flex justify-center pb-10 gap-10">
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/7PsTbfws/asus-gaming-laptop.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-45%</span>
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">ASUS FHD Gaming Laptop</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$129</h5><span className="text-gray-500 font-medium line-through text-xl">$300</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">(42)</span></div>
            </div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/7PsTbfws/asus-gaming-laptop.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-45%</span>
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">ASUS FHD Gaming Laptop</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$129</h5><span className="text-gray-500 font-medium line-through text-xl">$300</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">(42)</span></div>
            </div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/7PsTbfws/asus-gaming-laptop.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-45%</span>
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">ASUS FHD Gaming Laptop</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$129</h5><span className="text-gray-500 font-medium line-through text-xl">$300</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">(42)</span></div>
            </div>
            <div>
                <div className="relative">
                <img className="bg-[#F5F5F5] px-16 pt-16 pb-20 w-[300px] h-[300px] rounded" src="https://i.postimg.cc/7PsTbfws/asus-gaming-laptop.png" alt="G92 Gamepad" />
                <span className="bg-[#DB4444] absolute top-5 left-4 text-white py-1 px-4 rounded poppins">-45%</span>
                <IoEyeOutline className="bg-[#FFFFFF] absolute top-3 left-60 text-[45px] p-2.5 rounded-full"/>
                <p className="bg-[#000000] absolute bottom-0 w-full text-base poppins font-medium text-[#FFFFFF] py-2.5 text-center rounded-b">Add To Cart</p>
                </div>
                <h4 className="text-[#000000] text-xl poppins font-semibold pt-3">ASUS FHD Gaming Laptop</h4>
                <div className="flex gap-4 py-2"><h5 className="text-[#DB4444] text-xl font-medium">$129</h5><span className="text-gray-500 font-medium line-through text-xl">$300</span></div>
                <div className="flex gap-2 items-center"><Rating style={{ maxWidth: 130 }} value={ratings} onChange={setRatings}  isRequired/> <span className="text-gray-500 font-semibold text-[18px]">(42)</span></div>
            </div>
            </div>
        </div>
    );
};

export default Wishlist;