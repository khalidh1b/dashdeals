
const NewArrival = () => {
    return (
        <div>
            <div className="flex text-[#DB4444] items-center gap-3 ml-36 font-semibold pt-20"><div className="bg-[#DB4444] rounded py-5 px-2"></div>Featured</div>
            <div className="flex items-center justify-between mx-36 pb-10">
                <div>
                    <h2 className="text-[32px] pt-4 font-semibold">New Arrival</h2>
                </div>
            </div>

            <div className="flex gap-7 justify-center">
                <div className="bg-[#0D0D0D] rounded relative">
                    <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411591/playstation_wmqlfr.png" alt="playstation5" />
                    <div className="absolute bottom-9 left-9"><h3 className="text-[#FAFAFA] text-2xl font-semibold">PlayStation 5</h3>
                    <h4 className="text-[#FAFAFA] pt-3 pb-3 text-[14px] font-normal poppins">Black and White version of the PS5 <br /> coming out on sale.</h4>
                    <p className="text-[#FFFFFF] text-base font-medium border-b-[1px] w-20">Shop Now</p></div>
                </div>
                <div>
                    <div className="relative rounded border pl-32 bg-[#0D0D0D]">
                        <img src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411590/woman-wearing-hat_vcw2am.png" alt="woman-wearing-hat" />
                        <div className="absolute top-32 left-7"><h2 className="text-[#FAFAFA] text-2xl font-semibold">Womens Collections</h2>
                        <p className="text-[#FAFAFA] pt-3 pb-3 text-[14px] font-normal poppins">Featured woman collections that <br /> give you another vibe.</p>
                        <p className="text-[#FFFFFF] text-base font-medium border-b-[1px] w-20">Shop Now</p></div>
                    </div>
                    <div className="flex gap-7 pt-7">
                        <div className="w-1/2 py-7 rounded bg-[#0D0D0D] relative"><img className="mx-auto" src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411588/amazon-alexa_ccroy1.png" alt="speakers" />
                        <div className="absolute bottom-7 left-7"><h3 className="text-[#FAFAFA] text-2xl font-semibold">Speakers</h3>
                        <h4 className="text-[#FAFAFA] pb-3 text-[14px] font-normal poppins">Amazon wireless speakers.</h4>
                        <p className="text-[#FFFFFF] text-base font-medium border-b-[1px] w-20">Shop Now</p></div>
                        </div>
                        <div className="w-1/2 py-7 rounded bg-[#0D0D0D] relative"><img className="mx-auto" src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411587/guchi-perfume_r6r8gy.png" alt="perfume" />
                        <div className="absolute bottom-7 left-7"><h3 className="text-[#FAFAFA] text-2xl font-semibold">Perfume</h3>
                        <h4 className="text-[#FAFAFA] pb-3 text-[14px] font-normal poppins">GUCCI INTENSE OUD EDP</h4>
                        <p className="text-[#FFFFFF] text-base font-medium border-b-[1px] w-20">Shop Now</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewArrival;