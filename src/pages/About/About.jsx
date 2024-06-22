import DashDealsPros from '../../Components/DashDealPros/DashDealsPros';
import OurStoryStats from '../../Components/OurStoryStats/OurStoryStats';
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";



const About = () => {
    return (
        <div>
            <p className='text-gray-300 pt-10 pl-20'>Home / <span className='text-[14px] text-[#000] poppins font-normal'>About</span></p>
            <div className="flex items-center gap-10 py-24 px-20">
                <div>
                    <h1 className="text-[#000] text-[50px] font-semibold pb-6">Our Story</h1>
                    <p className="text-[#000] text-base poppins pb-5 font-normal">Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. </p>
                    <p className="text-[#000] text-base poppins font-normal">Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.</p>
                </div>
                <img className="rounded" src="https://i.postimg.cc/6py5hmJc/our-story-banner.png" alt="our-story-banner" />
            </div>
            <OurStoryStats></OurStoryStats>

            <div className='flex gap-7 pt-20 justify-center'>
                <div>
                    <div className='pt-9 px-12 rounded bg-[#F5F5F5]'>
                        <img className='' src="https://i.postimg.cc/J4by7yKb/tom-cruise.png" alt="Tom Cruise" />
                    </div>
                    <h2 className='text-[30px] text-[#000] font-medium pt-3'>Tom Cruise</h2>
                    <p className='text-base poppins font-normal text-[#000] pb-2'>Founder & Chairman</p>
                    <div className='flex gap-2'>
                        <CiTwitter className='text-xl'/>
                        <FaInstagram className='text-xl'/>
                        <FaLinkedinIn className='text-xl'/>
                    </div>
                </div>
                <div>
                    <div className='pt-8 px-12 rounded bg-[#F5F5F5]'>
                        <img src="https://i.postimg.cc/Df1fL9sh/emma-watson.png" alt="Emma Watson" />
                    </div>
                    <h2 className='text-[30px] text-[#000] font-medium pt-3'>Emma Watson</h2>
                    <p className='text-base poppins font-normal text-[#000] pb-2'>Managing Director</p>
                    <div className='flex gap-2'>
                        <CiTwitter className='text-xl'/>
                        <FaInstagram className='text-xl'/>
                        <FaLinkedinIn className='text-xl'/>
                    </div>
                </div>
                <div>
                    <div className='pt-9 px-12 rounded bg-[#F5F5F5]'>
                        <img src="https://i.postimg.cc/C50gcKDg/will-smith.png" alt="Will Smith" />
                    </div>
                    <h2 className='text-[30px] text-[#000] font-medium pt-3'>Will Smith</h2>
                    <p className='text-base poppins font-normal text-[#000] pb-2'>Product Designer</p>
                    <div className='flex gap-2'>
                        <CiTwitter className='text-xl'/>
                        <FaInstagram className='text-xl'/>
                        <FaLinkedinIn className='text-xl'/>
                    </div>
                </div>
            </div>

            <div className='pb-20'><DashDealsPros></DashDealsPros></div>
        </div>
    );
};

export default About;