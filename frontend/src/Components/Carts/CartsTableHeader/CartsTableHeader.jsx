
const CartsTableHeader = () => {
    return (
        <div className="flex justify-between border md:mx-32 py-5 px-5 rounded shadow-md text-base poppins font-normal">
            <p className="">Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
        </div>
    );
};

export default CartsTableHeader;