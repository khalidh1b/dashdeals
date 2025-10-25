import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import useUserFeedback from "@/shared/hooks/useUserFeedback";

const Contact = () => {
    const { handleUserFeedback } = useUserFeedback();

    const sectionTitleClass = "flex gap-4 items-center pb-4";
    const iconWrapperClass = "bg-[#DB4444] text-white p-[7px] text-4xl rounded-full";
    const titleTextClass = "poppins text-base font-medium text-black dark:text-white";
    const paragraphClass = "poppins font-normal text-[14px] text-black dark:text-white";

    return (
        <div>
        <p className='text-gray-300 pt-10 pl-20'>Home / <span className='text-[14px] text-black dark:text-white poppins font-normal'>Contact</span></p>
        <div className="flex justify-center gap-8 pt-28 pb-36">
            
            <div className="border dark:border-white px-10 py-14 rounded shadow-md">
                <div className={sectionTitleClass}>
                    <IoCallOutline className={iconWrapperClass} />
                    <span className={titleTextClass}>Call To Us</span>
                </div>
                <p className={paragraphClass}>Emails: support@exclusive.com</p>
                <p className={`${paragraphClass} pb-4`}>We are available 24/7, 7 days a week.</p>
                <p className={`${paragraphClass} pb-7`}>Phone: +8801611112222</p>

                <hr className="border-[#000000] dark:border-white" />

                <div className="pt-8 pb-6 flex gap-4 items-center">
                    <CiMail className={iconWrapperClass} />
                    <span className={titleTextClass}>Write To Us</span>
                </div>
                <p className={`${paragraphClass} pb-5`}>
                    Fill out our form and we will contact <br /> you within 24 hours.
                </p>
                <p className={`${paragraphClass} pb-4`}>Emails: customer@exclusive.com</p>
            </div>

            <div className="border dark:border-white px-7 py-9">
                <form onSubmit={handleUserFeedback}>
                    
                    <input 
                        className="py-2 pl-3 rounded mr-4 focus:outline-none bg-[#F5F5F5]" 
                        type="text" 
                        name="name" 
                        placeholder="Your Name" 
                        required
                    />
                    <input 
                        className="py-2 pl-3 rounded mr-4 focus:outline-none bg-[#F5F5F5]" 
                        type="email" 
                        name="email" 
                        placeholder="Your Email" 
                        required
                    />
                    <input 
                        className="py-2 pl-3 rounded focus:outline-none bg-[#F5F5F5]"
                        type="number" 
                        id="phone" 
                        placeholder="Your Phone" 
                        required
                    /> <br />

                    <textarea 
                        className="bg-[#F5F5F5] pl-5 pt-5 mt-8 w-full h-[230px] focus:outline-none rounded" 
                        name="message" 
                        placeholder="Your Message"
                    ></textarea> <br />
                    <input 
                        className="py-3 px-10 bg-[#DB4444] mt-5 text-white rounded absolute right-40" 
                        type="submit" 
                        value="Send Message" 
                    />
                </form>
            </div>
        </div>
        </div>
    );
};

export default Contact;