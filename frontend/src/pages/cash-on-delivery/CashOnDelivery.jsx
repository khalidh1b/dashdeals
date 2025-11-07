import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CashOnDelivery = () => {
    const location = useLocation();
    const { cartSubtotal } = location.state || {};
    useEffect(() => {
        //console.log('Received state in cashondelivery:', { cartSubtotal });
    }, [location.state, cartSubtotal ]);

    return (
        <div>
            <h1>cash on delivery page for payment</h1>
        </div>
    );
};

export default CashOnDelivery;