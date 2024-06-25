import { useEffect, useState } from "react";
import BestSellingProduct from "./BestSellingProduct";
import useAxiosPublic from '../../hooks/useAxiosPublic';

const BestSellingProducts = () => {
    const [products, setProducts] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/bestSellingProducts')
        .then((res) => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [axiosPublic]);

    return (
        <div className="pb-20">
            <hr className="border-t-2 mx-36 mt-16 mb-20 "/>
            <div className="flex text-[#DB4444] items-center gap-3 ml-36 font-semibold"><div className="bg-[#DB4444] rounded py-5 px-2"></div>This Month</div>
            <div className="flex items-center justify-between mx-36">
                <div>
                    <h2 className="text-[32px] font-semibold">Best Selling Products</h2>
                </div>
                <div>
                    <button className="text-white bg-[#DB4444] py-3 px-10 rounded">View All</button>
                </div>
            </div>

            <div className="flex justify-center gap-4 items-center pt-8">
                {
                    products.map(product => <BestSellingProduct key={product.id} product={product}></BestSellingProduct>)
                }
            </div>
        </div>
    );
};

export default BestSellingProducts;