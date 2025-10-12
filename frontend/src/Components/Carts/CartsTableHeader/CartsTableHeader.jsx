import '@/components/carts/style.css';

const CartsTableHeader = () => {
    return (
        <div className="cart-table-header poppins">
            <p className="">Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>
    );
};

export default CartsTableHeader;