import { useState, useMemo } from 'react';
import useFetchOrdersData from './useFetchOrdersData';

// Custom hook that encapsulates all business logic for the orders page
export const useOrdersLogic = () => {
    
    // Fetch orders data
    const { cus_orderData, isLoading, refetch } = useFetchOrdersData();
    
    // Filter state
    const [filter, setFilter] = useState("all");

    // Transform orders data for display and memoized for performance
    const ordersWithProducts = useMemo(() => {
        return cus_orderData.map((order) => ({
            orderId: order._id,
            status: order.status,
            products: order.products || [],
            date: order.orderDate,
            total: order.amount,
            trackingId: order.paymentId,
        }));
    }, [cus_orderData]);

    // Calculate stats and memoized for performance
    const stats = useMemo(() => {
        return {
            total: cus_orderData.length,
            pending: cus_orderData.filter((o) => o.status === "pending").length,
            delivered: cus_orderData.filter((o) => o.status === "delivered").length,
            cancelled: cus_orderData.filter((o) => o.status === "cancelled").length,
        };
    }, [cus_orderData]);

    // Filter orders based on selected filter and memoized for performance
    const filteredOrders = useMemo(() => {
        if (filter === "all") return ordersWithProducts;
        return ordersWithProducts.filter((order) => order.status === filter);
    }, [ordersWithProducts, filter]);

    return {
        orders: filteredOrders,
        stats,
        isLoading,        
        filter,
        handlers: {
            setFilter,
            refetch,
        }
    };
};