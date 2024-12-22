import { useEffect, useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Product from "./Product";
import Countdown from 'react-countdown';
import renderer from '../SaleCountDown/SaleCountDown';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('products/flashSalesProducts')
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [axiosPublic])

    const endTime = Date.now() + 343196000;

    return (
        <div className="pt-28">
            <div className="flex text-[#DB4444] items-center gap-3 ml-36 font-semibold">
                <div className="bg-[#DB4444] rounded py-5 px-2"></div>
                Todays
            </div>
            <div className="flex items-center justify-between mx-36">
                <Countdown date={endTime} renderer={renderer}/>
                <div className="flex gap-2">
                    <FaArrowRightLong className="bg-[#F5F5F5] dark:bg-slate-500 text-4xl p-2.5 rounded-full" />
                    <FaArrowLeftLong className="bg-[#F5F5F5] dark:bg-slate-500 text-4xl p-2.5 rounded-full" />
                </div>
            </div>

            {/* All products here */}
            <div className="flex justify-center gap-4 items-center pt-8">
                {products.map(product => (
                    <Product key={product.id} product={product}></Product>
                ))}
            </div>

            {/* Wishlist */}
            {/* Wishlist */}
            
            <div className="flex justify-center pt-16">
                <button className="text-[#FAFAFA] text-base font-medium bg-[#DB4444] py-3 px-9 rounded">
                    View All Products
                </button>
            </div>
        </div>
    );
};

export default AllProducts;
