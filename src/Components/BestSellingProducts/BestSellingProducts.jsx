import { useEffect, useState } from "react";
import BestSellingProduct from "./BestSellingProduct";
import useAxiosPublic from '../../hooks/useAxiosPublic.js';
import { ProductCardSkeleton } from '../Skeletons/ProductCardSkeleton.jsx';

const BestSellingProducts = () => {
    const [products, setProducts] = useState([]);
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            try {
                axiosPublic.get('products/bestSellingProducts')
                .then((res) => {
                    console.log(res.data);
                    setProducts(res.data);
                })
                .catch((error) => {
                    console.log(error);
                })
            } catch (error) {
                console.error('error while fetching bestsellingproducts', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [axiosPublic]);

    return (
        <div className="pb-20">
            <hr className="border-t-2 mx-36 mt-16 mb-20 "/>
            <div className="flex text-[#DB4444] items-center gap-3 md:ml-36 font-semibold"><div className="bg-[#DB4444] rounded py-5 px-2"></div>This Month</div>
            <div className="flex items-center justify-between md:mx-36">
                <div>
                    <h2 className="text-[32px] font-semibold">Best Selling Products</h2>
                </div>
                <div>
                    <button className="text-white bg-[#DB4444] py-3 md:px-10 px-3 rounded">View All</button>
                </div>
            </div>

            <div className="md:flex justify-center grid gap-8 md:gap-4 items-center pt-8">
                { !loading ? 
                    products.map(product => <BestSellingProduct key={product.id} product={product}></BestSellingProduct>) :
                    Array.from({ length: 4 }).map((_, idx) => (
                        <ProductCardSkeleton key={idx}/>
                    ))
                }
            </div>
        </div>
    );
};

export default BestSellingProducts;