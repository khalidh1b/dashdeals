import { FaArrowRight } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Image } from '@/component/common/image/image';

const categories = [
    { name: "Womans Fashion", hasIcon: true },
    { name: "Mens Fashion", hasIcon: true },
    { name: "Electronics", hasIcon: false },
    { name: "Home & Lifestyle", hasIcon: false },
    { name: "Medicine", hasIcon: false },
    { name: "Sports & Outdoor", hasIcon: false },
    { name: "Babys & Toys", hasIcon: false },
    { name: "Groceries & Pets", hasIcon: false },
    { name: "Health & Beauty", hasIcon: false }
];

const Banner = () => {
    return (
        <div className="md:flex justify-center gap-10 items-center">
            <div className="border-r md:block hidden px-5 pt-16">
                <CategoriesList/>
            </div>
            <div className="md:mt-10 border">
                <BannerContent/>
            </div>
        </div>
    );
};

export default Banner;

const CategoriesList = () => {
    return (
        <ul className="grid gap-4 text-black dark:text-white text-base poppins font-normal">
        {categories.map((category, index) => (
            <li
                key={index}
                className={`flex items-center ${category.hasIcon ? "justify-between" : ""}`}
                >
                <button 
                    type="button"
                    className="text-black dark:text-white text-base poppins font-normal hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer bg-transparent border-none p-0"
                    aria-label={`Browse ${category.name} category`}
                >
                    {category.name}
                </button>
                {category.hasIcon && <MdKeyboardArrowRight className="text-xl" />}
            </li>
        ))}
    </ul>
    )
};


const BannerContent = () => {
    return (
        <div className="md:flex items-center gap-5 rounded bg-black pl-14 py-5">
            <div className="flex-1">
                <div className="flex items-center gap-6">
                    <Image
                        src="https://res.cloudinary.com/dksiicemx/image/upload/v1729410233/apple-logo_uvcfq8.png"
                        alt="Apple iPhone 14 Series logo"
                        className="w-12 h-12 object-contain"
                        width={48}
                        height={48}
                    />
                    <span className="text-white poppins text-base font-normal">
                        iPhone 14 Series
                    </span>
                </div>
                <h1 className="text-white text-[48px] pt-3 pb-5 font-semibold leading-[60px]">
                    Up to 10% <br /> off Voucher
                </h1>
                <div className="flex gap-2 items-center">
                    <p className="flex items-center gap-2 border-b text-white poppins text-base font-medium cursor-pointer hover:text-gray-300 transition-colors">
                        Shop Now
                    </p>
                    <FaArrowRight className="text-white" />
                </div>
            </div>
            <div className="flex-shrink-0">
                <Image
                    src="https://res.cloudinary.com/dksiicemx/image/upload/v1729410063/banner_uln8mz.png"
                    alt="iPhone 14 Series promotional banner showing smartphone with discount offer"
                    className="w-full max-w-md h-auto object-contain md:max-w-lg lg:max-w-xl"
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>
        </div>
    );
};