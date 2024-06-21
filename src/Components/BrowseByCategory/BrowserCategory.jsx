import { FaArrowRightLong } from "react-icons/fa6";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiMobile4 } from "react-icons/ci";
import { FaComputer } from "react-icons/fa6";
import { BsSmartwatch } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";
import { CiHeadphones } from "react-icons/ci";
import { VscGame } from "react-icons/vsc";


const BrowserCategory = () => {
    return (
        <div className="mb-16">
            <hr className="mx-36 mt-16 mb-20 border-t-2"/>
            <div className="flex text-[#DB4444] items-center gap-3 ml-36 font-semibold"><div className="bg-[#DB4444] rounded py-5 px-2"></div>Categories</div>
            <div className="flex items-center justify-between mx-36">
                <div>
                    <h2 className="text-[32px] font-semibold">Browse By Categories</h2>
                </div>
                <div className="flex gap-2">
                    <FaArrowRightLong className="bg-[#F5F5F5] text-4xl p-2.5 rounded-full"/>
                    <FaArrowLeftLong className="bg-[#F5F5F5] text-4xl p-2.5 rounded-full"/>
                </div>
            </div>

            {/* category here */} 
            <div className="flex justify-center gap-8 pt-10">
                <div className="border px-10 py-6 rounded">
                    <CiMobile4 className="text-4xl mx-auto"/>
                    <p className="text-[14px] pt-1">Phones</p>
                </div>               
                <div className="border px-10 py-6 rounded">
                    <FaComputer className="text-4xl mx-auto"/>
                    <p className="text-[14px] pt-1">Computers</p>
                </div>               
                <div className="border px-10 py-6 rounded">
                    <BsSmartwatch className="text-4xl mx-auto"/>
                    <p className="text-[14px] pt-1">Smart Watch</p>
                </div>               
                <div className="border px-10 py-6 rounded text-white bg-[#DB4444]">
                    <CiCamera className="text-4xl mx-auto"/>
                    <p className="text-[14px] pt-1">Camera</p>
                </div>               
                <div className="border px-10 py-6 rounded">
                    <CiHeadphones className="text-4xl mx-auto"/>
                    <p className="text-[14px] pt-1">HeadPhones</p>
                </div>               
                <div className="border px-10 py-6 rounded">
                    <VscGame className="text-4xl mx-auto"/>
                    <p className="text-[14px] pt-1">Gaming</p>
                </div>               
            </div>
        </div>
    );
};

export default BrowserCategory;