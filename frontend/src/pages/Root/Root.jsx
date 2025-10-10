import Footer from '@/components/common/footer/Footer';
import Navbar from '@/components/common/navbar/Navbar';
import {Outlet} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div>
            <Toaster/>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;