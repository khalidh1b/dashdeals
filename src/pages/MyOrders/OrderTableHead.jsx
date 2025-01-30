
const OrderTableHead = () => {
    return (
        <>
            <thead>
                <tr className="bg-gray-100 text-[#000] text-[14px] font-medium">
                    <th>Id</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
        </>
    );
};

export default OrderTableHead;