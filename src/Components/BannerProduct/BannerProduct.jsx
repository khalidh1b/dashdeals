
const BannerProduct = () => {
    return (
        <div className="bg-[#000] flex justify-center py-16 mx-36 gap-8">
            <div>
                <h4 className="text-[#0F6] pb-7">Categories</h4>
                <h1 className="text-[48px] text-[#FAFAFA] font-semibold leading-[52px] pb-7">Enhance Your <br /> Music Experience</h1>
                <div className="flex gap-10">
                    <div className="bg-[#F5F8F9] rounded-full p-1 w-[65px] h-[65px]">
                        <span className="pl-4 text-base font-semibold">23</span>
                        <p className="text-[14px] text-center">Hours</p>
                    </div>
                    <div className="bg-[#F5F8F9] rounded-full p-1 w-[65px] h-[65px]">
                        <span className="pl-4 text-base font-semibold">05</span>
                        <p className="text-[14px] text-center">Days</p>
                    </div>
                    <div className="bg-[#F5F8F9] rounded-full p-1 w-[65px] h-[65px]">
                        <span className="pl-4 text-base font-semibold">59</span>
                        <p className="text-[14px]">Munites</p>
                    </div>
                    <div className="bg-[#F5F8F9] rounded-full w-[65px] h-[65px]">
                        <span className="pl-4 text-base font-semibold">35</span>
                        <p className="text-[14px]">Seconds</p>
                    </div>
                </div>
                <button className="bg-[#0F6] mt-10 text-white py-3 px-8 rounded">Buy Now!</button>
            </div>
            <div>
                <img src="https://i.postimg.cc/KvRzvbKL/jbl-boombox-hero.png" alt="Boombox" />
            </div>
        </div>
    );
};

export default BannerProduct;