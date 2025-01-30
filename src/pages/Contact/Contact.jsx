import { IoCallOutline } from "react-icons/io5";
import { CiMail } from "react-icons/ci";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Contact = () => {
    const axiosSecure = useAxiosSecure();

    const handleUserFeedback = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value;
        const data = {name, email, phone, message};
        console.log('clicking', data);

        axiosSecure.post('/userFeedback', data)
        .then((res) => {
            console.log(res);
            if(res.data.insertedId) {
                form.reset();
                Swal.fire({
                    icon: "success",
                    title: "Thanks for sharing your thoughts",
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div>
        <p className='text-gray-300 pt-10 pl-20'>Home / <span className='text-[14px] text-[#000] dark:text-white poppins font-normal'>Contact</span></p>
        <div className="flex justify-center gap-8 pt-28 pb-36">
            
            <div className="border dark:border-white px-10 py-14 rounded shadow-md">
                <div className="flex gap-4 items-center pb-4"><IoCallOutline className="bg-[#DB4444] text-white p-[7px] text-4xl rounded-full"/><span className="poppins text-base font-medium dark:text-white text-[#000]">Call To Us</span></div>
                <p className="poppins font-normal text-[#000] dark:text-white text-[14px] pb-4">We are available 24/7, 7 days a week.</p>
                <p className="poppins font-normal text-[#000] dark:text-white text-[14px] pb-7">Phone: +8801611112222</p>
                <hr className="border-[#000000] dark:border-white border-t-[1px]"/>
                <div className="flex gap-4 pt-8 pb-6 items-center"><CiMail className="bg-[#DB4444] text-white p-[7px] text-4xl rounded-full"/><span className="poppins text-base font-medium text-[#000] dark:text-white">Write To Us</span></div>
                <p className="poppins font-normal dark:text-white text-[#000] pb-5 text-[14px]">Fill out our form and we will contact <br /> you within 24 hours.</p>
                <p className="poppins font-normal dark:text-white text-[#000] text-[14px] pb-4">Emails: customer@exclusive.com</p>
                <p className="poppins font-normal text-[#000] dark:text-white text-[14px]">Emails: support@exclusive.com</p>
            </div>

            <div className="border dark:border-white px-7 py-9">
                <form onSubmit={handleUserFeedback}>
                    <input className="py-2 pl-3 rounded mr-4 focus:outline-none bg-[#F5F5F5]" type="text" name="name" id="" placeholder="Your Name" required/>
                    <input className="py-2 pl-3 rounded mr-4 focus:outline-none bg-[#F5F5F5]" type="email" name="email" id="" placeholder="Your Email" required/>
                    <input className="py-2 pl-3 rounded focus:outline-none bg-[#F5F5F5]" type="number" name="" id="phone" placeholder="Your Phone" required/> <br />
                    <textarea className="bg-[#F5F5F5] pl-5 pt-5 mt-8 w-full h-[230px] focus:outline-none rounded" name="message" id="" placeholder="Your Message"></textarea> <br />
                    <input className="py-3 px-10 bg-[#DB4444] mt-5 text-white rounded absolute right-40" type="submit" value="Send Message" />
                </form>
            </div>

        </div>
        </div>
    );
};

export default Contact;