import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer';

const ErrorPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <p className='text-gray-300 pt-10 pl-10'>Home / <span className='text-[14px] text-[#000] poppins font-normal'>404 Error</span></p>
            <div className="flex flex-col justify-center items-center -h-screen pb-28">
                <h1 className="text-[110px] text-[#000] font-medium">404 Not Found</h1>
                <p className='pb-16'>Your visited page not found. You may go home page.</p>
                <button className="text-[#FAFAFA] text-base  poppins font-normal py-3 px-10 rounded bg-[#DB4444]">Back to home page</button>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default ErrorPage;