import services from './services.json';
import PropTypes from 'prop-types';
import { Image } from '@/components/common/image/image';

const DashDealsPros = () => {
    return (
        <div className="md:flex grid gap-20 pt-28 pb-10 justify-center">
            {services.map((service) => (
                <ServiceItem
                    key={service.id}
                    icon={service.icon} 
                    title={service.title} 
                    description={service.description}
                />
            ))}
        </div>
    );
};

export default DashDealsPros;

const ServiceItem = ({ icon, title, description }) => {
    return (
        <div>
            <div className="border p-2.5 rounded-full w-[70px] mx-auto bg-[#2F2E30]">
            <Image className="bg-[#000000] rounded-full p-1" src={icon} alt={title} />
            </div>
            <h3 className="text-xl poppins font-semibold pt-4 text-black dark:text-white text-center">
                {title}
            </h3>
            <p className="text-[14px] poppins font-normal text-center">{description}</p>
        </div>
    )
};

ServiceItem.propTypes = {
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
};