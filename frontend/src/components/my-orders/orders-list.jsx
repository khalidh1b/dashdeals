import { useMemo, useCallback } from "react";
import { OrderDetailModal } from "./order-detail-modal";
import { OrderCard } from "./order-card";
import { EmptyOrdersState } from "./empty-orders-state";
import useDeleteOrder from "@/features/orders/hooks/useDeleteOrder";
import { useOrdersList } from "@/features/orders/hooks/useOrdersList";

export const OrdersList = ({ orders, onOrderDeleted }) => {
  const { deleteOrder, isLoading } = useDeleteOrder()
  const {
    selectedOrder,
    openMenuId,
    handleSelectOrder,
    handleCloseOrderDetails,
    handleToggleMenu
  } = useOrdersList()

  // Memoized filtered orders
  const memoizedOrders = useMemo(() => orders || [], [orders])

  // Handle order deletion with optimistic updates
  const handleDeleteOrder = useCallback(async (orderId) => {
    try {
      await deleteOrder(orderId)
      onOrderDeleted?.()
    } catch (error) {
      console.error('Failed to delete order:', error)
    }
  }, [deleteOrder, onOrderDeleted])

  // Render empty state when no orders
  if (memoizedOrders.length === 0) {
    return <EmptyOrdersState />
  }

  return (
    <>
      <div className={`space-y-3 ${isLoading && 'cursor-not-allowed opacity-50'}`}>
        {memoizedOrders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            onSelectOrder={handleSelectOrder}
            onDeleteOrder={handleDeleteOrder}
            onToggleMenu={handleToggleMenu}
            isMenuOpen={openMenuId === order.orderId}
            isLoading={isLoading}
          />
        ))}
      </div>

      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={handleCloseOrderDetails} 
        />
      )}
    </>
  )
};