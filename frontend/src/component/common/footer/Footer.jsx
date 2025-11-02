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
          { text: "exclusive@gmail.com", href: "mailto:exclusive@gmail.com" },
          { text: "+88015-88888-9999", href: "tel:+88015888889999" },
        ],
      },
      {
        title: "Account",
        links: [
          { text: "My Account", href: "/profile" },
          { text: "Login / Register", href: "/login" },
          { text: "Cart", href: "/carts" },
          { text: "Wishlist", href: "/wishlist" },
          { text: "Shop", href: "/products" },
        ],
      },
      {
        title: "Quick Link",
        links: [
          { text: "Privacy Policy", href: "/privacy" },
          { text: "Terms Of Use", href: "/terms" },
          { text: "FAQ", href: "/faq" },
          { text: "Contact", href: "/contact" },
        ],
      }
];

const socialIcons = [
    { icon: <FaFacebookF className="text-xl" />, href: "#", label: "Follow us on Facebook" },
    { icon: <CiTwitter className="text-xl" />, href: "#", label: "Follow us on Twitter" },
    { icon: <FaInstagram className="text-xl" />, href: "#", label: "Follow us on Instagram" },
    { icon: <FaLinkedinIn className="text-xl" />, href: "#", label: "Follow us on LinkedIn" },
  ];

const Footer = () => {
    return (
        <div>
        <div className="bg-black md:flex justify-center gap-20 pt-20 pb-16">
          
          <div className="pl-5 md:pl-0">
            <h4 className="text-2xl font-semibold text-gray-900">Exclusive</h4>
            <h5 className="text-gray-900 text-xl pt-3 font-normal poppins">Subscribe</h5>
            <p className="text-base text-gray-900 pt-5 pb-2 font-normal poppins">
              Get 10% off your first order
            </p>
            <div className="md:flex relative">
              <input
                className="py-2 pl-3 bg-black dark:bg-[#27272A] border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-red-600"
                type="text"
                placeholder="Enter your email"
                aria-label="Email for newsletter subscription"
              />
              <IoMdSend className="absolute text-white text-2xl md:right-3 right-36 top-2" />
            </div>
          </div>
  
          {footerSections.map((section, index) => (
            <FooterLinkList key={index} title={section.title} links={section.links} />
          ))}
  
          <div className="md:pl-0 md:mt-0 mt-5 pl-5">
            <h4 className="text-xl font-medium text-gray-900 pb-4">Download App</h4>
            <p className="text-[12px] poppins font-medium text-gray-900 pb-1">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-3">
              <Image
                src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411583/Qrcode_1_frzc4d.png"
                alt="qr-code"
                width={100}
                height={100}
              />
              <div className="grid gap-2">
                <Image
                  src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411582/google-play-store_xz5mmg.png"
                  alt="play-store"
                  width={120}
                  height={40}
                />
                <Image
                  src="https://res.cloudinary.com/dksiicemx/image/upload/v1729411581/appstore_lkwdcq.png"
                  alt="app-store"
                  width={120}
                  height={40}
                />
              </div>
            </div>
            <SocialIcons icons={socialIcons} />
          </div>
        </div>
  
        <p className="text-white poppins text-base font-normal flex items-center gap-1 justify-center py-6 border-t border-t-gray-500 bg-black">
          <FaRegCopyright /> Copyright DashDeals 2025. All right reserved
        </p>
      </div>
    );
};

export default Footer;

const FooterLinkList = ({ title, links }) => (
    <ul className="text-gray-900 text-base pl-5 md:pl-0 md:mt-0 mt-4 poppins font-normal">
      <li className="text-xl font-medium text-gray-900 pb-4">{title}</li>
      {links.map((link, index) => (
        <li key={index} className="pb-3">
          {link.href === "#" ? (
            <span className="text-gray-900 opacity-75">{link.text}</span>
          ) : (
            <a href={link.href} className="text-gray-900 hover:text-gray-300 transition-colors">
              {link.text}
            </a>
          )}
        </li>
      ))}
    </ul>
  );

const SocialIcons = ({ icons }) => (
    <div className="text-white flex pt-5 gap-4 items-center">
      {icons.map((icon, index) => (
        <a 
          key={index} 
          href={icon.href}
          aria-label={icon.label}
          className="text-white hover:text-gray-300 transition-colors"
        >
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
