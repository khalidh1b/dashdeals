const useQuantityMinus = (setQuantities, setSubtotals) => {
    const quantityMinus = (id, quantity, product) => {
        const newQuantity = Math.max((quantity || 1) - 1, 1);
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
    
    return quantityMinus;
};

export default useQuantityMinus;