import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";


const Contact = () => {
    return (
        <div>
        <p className='text-gray-300 pt-10 pl-20'>Home / <span className='text-[14px] text-[#000] poppins font-normal'>Contact</span></p>
        <div className="flex justify-center gap-8 pt-28 pb-36">
            <div className="border px-10 py-14 rounded shadow-md">
                <div className="flex gap-4 items-center pb-4"><IoCallOutline className="bg-[#DB4444] text-white p-[7px] text-4xl rounded-full"/><span className="poppins text-base font-medium text-[#000]">Call To Us</span></div>
                <p className="poppins font-normal text-[#000] text-[14px] pb-4">We are available 24/7, 7 days a week.</p>
                <p className="poppins font-normal text-[#000] text-[14px] pb-7">Phone: +8801611112222</p>
                <hr className="border-[#000000] border-t-[1px]"/>
                <div className="flex gap-4 pt-8 pb-6 items-center"><CiMail className="bg-[#DB4444] text-white p-[7px] text-4xl rounded-full"/><span className="poppins text-base font-medium text-[#000]">Write To Us</span></div>
                <p className="poppins font-normal text-[#000] pb-5 text-[14px]">Fill out our form and we will contact <br /> you within 24 hours.</p>
                <p className="poppins font-normal text-[#000] text-[14px] pb-4">Emails: customer@exclusive.com</p>
                <p className="poppins font-normal text-[#000] text-[14px]">Emails: support@exclusive.com</p>
            </div>
            <div className="border px-7 py-9">
                <form>
                    <input className="py-2 pl-3 rounded mr-4 focus:outline-none bg-[#F5F5F5]" type="text" name="" id="" placeholder="Your Name" required/>
                    <input className="py-2 pl-3 rounded mr-4 focus:outline-none bg-[#F5F5F5]" type="email" name="" id="" placeholder="Your Email" required/>
                    <input className="py-2 pl-3 rounded focus:outline-none bg-[#F5F5F5]" type="number" name="" id="" placeholder="Your Phone" required/> <br />
                    <textarea className="bg-[#F5F5F5] pl-5 pt-5 mt-8 w-full h-[230px] focus:outline-none rounded" name="" id="" placeholder="Your Message"></textarea> <br />
                    <input className="py-3 px-10 bg-[#DB4444] mt-5 text-white rounded absolute right-40" type="submit" value="Send Message" />
                </form>
            </div>
        </div>
        </div>
    );
};

export default Contact;