import featuredItems from './featuredItems.json';
import PropTypes from 'prop-types';
import { Image } from '@/components/common/image/image';

const NewArrival = () => {
    return (
        <>
            <NewArrivalHeader/>
            <div className="md:flex gap-7 justify-center">
                <FeaturedItem {...featuredItems[0]}/>
                <div>
                    <FeaturedItem {...featuredItems[1]}/>
                    <div className="flex gap-7 pt-7">
                        <FeaturedItem {...featuredItems[2]}/>
                        <FeaturedItem {...featuredItems[3]}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewArrival;

const NewArrivalHeader = () => {
    return (
        <>
            <div className="flex text-red-700 items-center gap-3 md:ml-36 font-semibold pt-20">
                <div className="bg-red-600 rounded py-5 px-2"></div>
                    Featured
                </div>
                <div className="flex items-center justify-between md:mx-36 pb-10">
                <div>
                    <h2 className="text-[32px] pt-4 font-semibold">New Arrival</h2>
                </div>
            </div>
        </>
    )
};

const FeaturedItem = ({ 
    image, 
    title, 
    description, 
    linkText, 
    bgColor 
}) => {
    return (
        <div className='rounded relative' style={{ backgroundColor: bgColor }}>
        <Image src={image} alt={title} className="w-full" width={600} height={400} />
        <div className="absolute bottom-9 left-9">
            <h3 className="text-gray-900 text-2xl font-semibold">{title}</h3>
            <h4 className="text-[#FAFAFA] pt-3 pb-3 text-[14px] font-normal poppins">{description}</h4>
            <p className="text-[#FFFFFF] text-base font-medium border-b w-20">{linkText}</p>
        </div>
        </div>
    )
};

FeaturedItem.propTypes = {
    image: PropTypes.string, 
    title: PropTypes.string, 
    description: PropTypes.string, 
    linkText: PropTypes.string, 
    bgColor: PropTypes.string
};