import Navbar from '@/components/common/navbar/Navbar'
import Footer from '@/components/common/footer/Footer';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div>
            <Navbar/>
            <p className='text-gray-300 pt-10 pl-10 md:pb-0 pb-4'>Home / <span className='text-[14px] text-black poppins font-normal'>404 Error</span></p>
            <div className="flex flex-col justify-center items-center -h-screen pb-28">
                <h1 className="md:text-[110px] text-[50px] text-black font-medium">404 Not Found</h1>
                <p className='pb-16'>Your visited page not found. You may go home page.</p>
                <Link to="/">
                    <button className="text-[#FAFAFA] text-base  poppins font-normal py-3 px-10 rounded bg-[#DB4444]">Back to home page</button>
                </Link>
            </div>
            <Footer/>
        </div>
    );
};

export default ErrorPage;