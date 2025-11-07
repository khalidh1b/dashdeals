import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/shared/hooks/useAxiosSecure";
import useAuth from "@/features/auth/hooks/useAuth";

// Constants for better maintainability
const QUERY_CONFIG = {
    STALE_TIME: 5 * 60 * 1000, // 5 minutes
    CACHE_TIME: 10 * 60 * 1000, // 10 minutes
    RETRY_DELAY: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    RETRY_COUNT: 3,
};

const useFetchOrdersData = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading: authLoading } = useAuth();

    const { 
        data: cus_orderData = [], 
        isLoading, 
        error, 
        refetch,
        isRefetching,
        isFetching
    } = useQuery({
        queryKey: ["userOrders", user?.email],
        queryFn: async () => {
            
            // Double-check user email exists before making the call
            if (!user?.email) {
                return [];
            };

            try {
                const res = await axiosSecure.get(`users/getUserOrderedProducts/${user.email}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("dashdeals-access-token")}`,
                    },
                });
                
                if (!res.data) {
                    return [];
                }
                
                return res.data;
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem("dashdeals-access-token");
                    throw new Error("Session expired. Please login again.");
                }
                throw err;
            }
        },
        enabled: !authLoading && !!user?.email && !!localStorage.getItem("dashdeals-access-token"),
        staleTime: QUERY_CONFIG.STALE_TIME,
        gcTime: QUERY_CONFIG.CACHE_TIME,
        retry: QUERY_CONFIG.RETRY_COUNT,
        retryDelay: QUERY_CONFIG.RETRY_DELAY,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true, 
    });

    return { 
        cus_orderData, 
        isLoading, 
        error, 
        refetch,
        isRefetching,
        isFetching
    };
};

export default useFetchOrdersData;