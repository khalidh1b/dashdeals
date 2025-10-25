import PropTypes from 'prop-types';
import { Image } from '@/components/common/image/image';

const OurStoryStats = () => {
    
    const stats = [
        {
          icon: "https://res.cloudinary.com/dksiicemx/image/upload/v1729423551/active-seller_ej1ycv.png",
          value: "10.5K",
          label: "Seller active on our site",
        },
        {
          icon: "https://res.cloudinary.com/dksiicemx/image/upload/v1729423551/product-scale_vbf8pm.png",
          value: "33K",
          label: "Monthly Product Sale",
          isPrimary: true,
        },
        {
          icon: "https://res.cloudinary.com/dksiicemx/image/upload/v1729423550/active-customer_ch2vda.png",
          value: "45.5K",
          label: "Customer active in our site",
        },
        {
          icon: "https://res.cloudinary.com/dksiicemx/image/upload/v1729423550/gross-sale_ix6ggs.png",
          value: "25K",
          label: "Annual gross sale in our site",
        },
      ];

    return (
        <div className="flex gap-6 pt-28 pb-10  justify-center">
            
            {stats.map((stat, index) => (
                <StatCard key={index} {...stat}/>
            ))}

        </div>
    );
};

export default OurStoryStats;

const StatCard = ({ icon, value, label, isPrimary }) => {
    return (
        <div
            className={`py-8 rounded px-10 ${
                isPrimary ? "bg-[#DB4444] text-white border-0" : "border-2"
            }`}
            >
            <div className="border p-2.5 rounded-full w-[70px] mx-auto bg-[#2F2E30]">
                <Image
                    className={`rounded-full p-2.5 ${
                        isPrimary ? "bg-white" : "bg-[#000000]"
                    }`}
                    src={icon}
                    alt={label}
                />
            </div>
            <h3 className="text-2xl poppins font-semibold pt-4 text-center text-black dark:text-white">
                {value}
            </h3>
            <p className="text-[14px] poppins font-normal text-center">{label}</p>
    </div>
    )
};

StatCard.propTypes = {
    icon: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    isPrimary: PropTypes?.bool
};