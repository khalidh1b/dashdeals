
const useQuantityPlus = (setQuantities, setSubtotals) => {
    const quantityPlus = (id, quantity, product) => {
        const newQuantity = (quantity || 0) + 1;
        const price = parseFloat(
        (product.discount_price === "$0"
            ? product.main_price
            : product.discount_price
        ).replace(/[^0-9.-]+/g, "")
        );
        const newSubtotal = newQuantity * price;
        setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
        }));
        setSubtotals((prevSubtotals) => ({
        ...prevSubtotals,
        [id]: newSubtotal,
        }));
    };
    
    return quantityPlus;
};

export default useQuantityPlus;