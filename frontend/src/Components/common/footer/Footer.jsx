import { IoMdSend } from "react-icons/io";
import { FaInstagram, FaLinkedinIn, FaRegCopyright } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import PropTypes from "prop-types";
import { Image } from '@/components/common/image/image';

const footerSections = [
    {
        title: "Support",
        links: [
          { text: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.", href: "#" },
          { text: "exclusive@gmail.com", href: "#" },
          { text: "+88015-88888-9999", href: "#" },
        ],
      },
      {
        title: "Account",
        links: [
          { text: "My Account", href: "#" },
          { text: "Login / Register", href: "#" },
          { text: "Cart", href: "#" },
          { text: "Wishlist", href: "#" },
          { text: "Shop", href: "#" },
        ],
      },
      {
        title: "Quick Link",
        links: [
          { text: "Privacy Policy", href: "#" },
          { text: "Terms Of Use", href: "#" },
          { text: "FAQ", href: "#" },
          { text: "Contact", href: "#" },
        ],
      }
];

const socialIcons = [
    { icon: <FaFacebookF className="text-xl" />, href: "#" },
    { icon: <CiTwitter className="text-xl" />, href: "#" },
    { icon: <FaInstagram className="text-xl" />, href: "#" },
    { icon: <FaLinkedinIn className="text-xl" />, href: "#" },
  ];

const Footer = () => {
    return (
        <div>
        <div className="bg-black md:flex justify-center gap-20 pt-20 pb-16">
          
          <div className="pl-5 md:pl-0">
            <h4 className="text-2xl font-semibold text-[#FAFAFA]">Exclusive</h4>
            <h5 className="text-[#FAFAFA] text-xl pt-3 font-normal poppins">Subscribe</h5>
            <p className="text-base text-[#FAFAFA] pt-5 pb-2 font-normal poppins">
              Get 10% off your first order
            </p>
            <div className="md:flex relative">
              <input
                className="py-2 pl-3 bg-black dark:bg-[#27272A] border rounded"
                type="text"
                placeholder="Enter your email"
              />
              <IoMdSend className="absolute text-white text-2xl md:right-3 right-36 top-2" />
            </div>
          </div>
  
          {footerSections.map((section, index) => (
            <FooterLinkList key={index} title={section.title} links={section.links} />
          ))}
  
          <div className="md:pl-0 md:mt-0 mt-5 pl-5">
            <h4 className="text-xl font-medium text-[#FAFAFA] pb-4">Download App</h4>
            <p className="text-[12px] poppins font-medium text-[#FAFAFA] pb-1">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-3">
              <Image
                src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411583/Qrcode_1_frzc4d.png"
                alt="qr-code"
              />
              <div className="grid gap-2">
                <Image
                  src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411582/google-play-store_xz5mmg.png"
                  alt="play-store"
                />
                <Image
                  src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411581/appstore_lkwdcq.png"
                  alt="app-store"
                />
              </div>
            </div>
            <SocialIcons icons={socialIcons} />
          </div>
        </div>
  
        <p className="text-white poppins text-base font-normal flex items-center gap-1 justify-center py-6 border-t border-t-gray-500 bg-black">
          <FaRegCopyright /> Copyright DashDeals 2024. All right reserved
        </p>
      </div>
    );
};

export default Footer;

const FooterLinkList = ({ title, links }) => (
    <ul className="text-[#FAFAFA] text-base pl-5 md:pl-0 md:mt-0 mt-4 poppins font-normal">
      <li className="text-xl font-medium text-[#FAFAFA] pb-4">{title}</li>
      {links.map((link, index) => (
        <li key={index} className="pb-3">
          <a href={link.href}>{link.text}</a>
        </li>
      ))}
    </ul>
  );

const SocialIcons = ({ icons }) => (
    <div className="text-white flex pt-5 gap-4 items-center">
      {icons.map((icon, index) => (
        <a key={index} href={icon.href}>
          {icon.icon}
        </a>
      ))}
    </div>
  );

SocialIcons.propTypes = {
    icons: PropTypes.array,
};

FooterLinkList.propTypes = {
    title: PropTypes.string,
    links: PropTypes.array,
};