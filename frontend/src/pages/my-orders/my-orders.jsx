import { useOrdersLogic } from '@/features/orders';
import { OrderStats } from '@/components/my-orders/order-stats';
import { OrdersFilter } from '@/components/my-orders/orders-filter';
import { OrdersList } from '@/components/my-orders/orders-list';

const MyOrders = () => {
    const { orders, stats, isLoading, filter, handlers } = useOrdersLogic();
    
    return (
        <div className='pb-20 min-h-screen'>
            <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
                    <p className="mt-2 text-muted-foreground">Track and manage all your purchases</p>
                </div>

                <div className="mb-8">
                    <OrderStats stats={stats} />
                </div>

                <div className="mb-8">
                    <OrdersFilter activeFilter={filter} onFilterChange={handlers.setFilter} />
                </div>

                <div>
                    <OrdersList orders={orders} onOrderDeleted={handlers.refetch} />
                </div>
            </div> 
            
        </div>
    );
};

export default MyOrders;