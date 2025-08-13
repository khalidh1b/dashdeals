import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
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