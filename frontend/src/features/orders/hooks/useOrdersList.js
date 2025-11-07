import { useState, useCallback, useEffect } from "react";

export function useOrdersList() {
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)

  // Close dropdown when clicking outside
  const handleClickOutside = useCallback(() => {
    setOpenMenuId(null)
  }, [])

  // Close dropdown when pressing Escape key
  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setOpenMenuId(null)
    }
  }, [])

  // Handle order selection
  const handleSelectOrder = useCallback((order) => {
    setSelectedOrder(order)
  }, [])

  // Handle closing order details
  const handleCloseOrderDetails = useCallback(() => {
    setSelectedOrder(null)
  }, [])

  // Handle dropdown menu toggle
  const handleToggleMenu = useCallback((orderId, event) => {
    event?.stopPropagation()
    setOpenMenuId(prev => prev === orderId ? null : orderId)
  }, [])

  // Add event listeners for escape key and click outside
  useEffect(() => {
    const handleGlobalKeyDown = (event) => handleKeyDown(event)
    const handleGlobalClick = () => handleClickOutside()

    document.addEventListener('keydown', handleGlobalKeyDown)
    document.addEventListener('click', handleGlobalClick)

    return () => {
      document.removeEventListener('keydown', handleGlobalKeyDown)
      document.removeEventListener('click', handleGlobalClick)
    }
  }, [handleKeyDown, handleClickOutside])

  return {
    selectedOrder,
    openMenuId,
    handleSelectOrder,
    handleCloseOrderDetails,
    handleToggleMenu,
    handleClickOutside,
    handleKeyDown
  }
};