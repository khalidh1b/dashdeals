import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiMobile4 } from "react-icons/ci";
import { FaComputer } from "react-icons/fa6";
import { BsSmartwatch } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import { VscGame } from "react-icons/vsc";
import PropTypes from 'prop-types';

const BrowserCategory = () => {
    const categories = [
        { icon: <CiMobile4 className="text-4xl mx-auto"/>, name: 'Phones' },
        { icon: <FaComputer className="text-4xl mx-auto"/>, name: 'Computers' },
        { icon: <BsSmartwatch className="text-4xl mx-auto"/>, name: 'Smart Watch' },
        { icon: <CiCamera className="text-4xl mx-auto"/>, name: 'Camera', isActive: true },
        { icon: <CiHeadphones className="text-4xl mx-auto"/>, name: 'HeadPhones' },
        { icon: <VscGame className="text-4xl mx-auto"/>, name: 'Gaming' }
    ];

    return (
        <div className="mb-16">
            <SectionDivider/>
            <SectionHeader/>
            <CategoriesList categories={categories}/>
        </div>
    );
};

export default BrowserCategory;

const SectionDivider = () => {
    return (
        <hr className="mx-36 mt-16 mb-20 border-t-2" />
    )
};

const SectionHeader = () => {
    <div className="flex items-center justify-between mx-36">
        <div>
            <h2 className="text-[32px] font-semibold">Browse By Categories</h2>
        </div>
        <div className="flex gap-2">
            <FaArrowRightLong className="bg-[#F5F5F5] dark:bg-slate-400 text-4xl p-2.5 rounded-full" />
            <FaArrowLeftLong className="bg-[#F5F5F5] dark:bg-slate-400 text-4xl p-2.5 rounded-full" />
        </div>
    </div>
};

const CategoriesList = ({ categories }) => {
    return (
        <div className="flex justify-center gap-8 pt-10">
            {categories.map((category, index) => (
            <CategoryItem key={index} {...category} />
            ))}
        </div>
    )
};

const CategoryItem = ({ icon, name, isActive }) => {
    return (
        <div
            className={`border px-10 py-6 rounded ${
            isActive ? 'text-white bg-[#DB4444]' : ''
            }`}
        >
        {icon}
        <p className="text-[14px] pt-1">{name}</p>
    </div>
    )
};

CategoriesList.propTypes = {
    categories: PropTypes.array
};

CategoryItem.propTypes = {
    icon: PropTypes.element,
    name: PropTypes.string,
    isActive: PropTypes.bool
};