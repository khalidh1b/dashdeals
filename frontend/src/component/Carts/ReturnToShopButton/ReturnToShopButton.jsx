import '@/component/Carts/style.css';
import { Link } from 'react-router-dom';

const ReturnToShopButton = () => {
    return (
        <>
            <Link to="/">
                <button className="return-to-shop-button poppins">
                    Return To Shop  
                </button>
            </Link>
        </>
    );
};

export default ReturnToShopButton;