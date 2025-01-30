import { useEffect, useState } from "react";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Product from "./Product";
import Countdown from 'react-countdown';
import renderer from '../SaleCountDown/SaleCountDown';
import useAxiosPublic from '../../hooks/useAxiosPublic.js';
import PropTypes from 'prop-types';
import { ProductCardSkeleton } from '../Skeletons/ProductCardSkeleton.jsx';

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                axiosPublic.get('products/flashSalesProducts')
                .then((res) => {
                    console.log(res.data);
                    setProducts(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
            } catch (error) {
                console.error('error while fetching products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [axiosPublic]);

    const endTime = Date.now() + 343196000;

    return (
        <div className="pt-28">
            <FlashSalesHeader/>
            <CountdownSection endTime={endTime}/>
            <ProductsSection products={products} loading={loading}/>
            <ViewAllProductsButton/>
        </div>
    );
};

export default AllProducts;

const FlashSalesHeader = () => {
    return (
        <div className="flex text-[#DB4444] items-center gap-3 md:ml-36 font-semibold">
            <div className="bg-[#DB4444] rounded py-5 px-2"></div>
            Todays
        </div>
    )
};

const CountdownSection = ({ endTime }) => {
    return (
        <div className="flex items-center justify-between md:mx-36">
            <Countdown date={endTime} renderer={renderer} />
            <ArrowButtons/>
        </div>
    )
};

const ArrowButtons = () => {
    return (
        <div className="md:flex hidden gap-2">
            <FaArrowRightLong className="bg-[#F5F5F5] dark:bg-slate-500 text-4xl p-2.5 rounded-full" />
            <FaArrowLeftLong className="bg-[#F5F5F5] dark:bg-slate-500 text-4xl p-2.5 rounded-full" />
        </div>
    )
};

const ProductsSection = ({ products, loading }) => {
    return (
        <div className="md:flex grid grid-cols-1 justify-center gap-6 md:gap-4 items-center pt-8">
            {!loading ? products.map(product => (
                <Product key={product.id} product={product} />
            )) : Array.from({ length: 4 }).map((_, idx) => (
                <ProductCardSkeleton key={idx}/>
            ))}
        </div>
    )
};

const ViewAllProductsButton = () => {
    return (
        <div className="flex justify-center pt-16">
            <button className="text-[#FAFAFA] text-base font-medium bg-[#DB4444] py-3 px-9 rounded">
                View All Products
            </button>
        </div>
    )
};

CountdownSection.propTypes = {
    endTime: PropTypes.number
};

ProductsSection.propTypes = {
    products: PropTypes.array,
    loading: PropTypes.bool
};