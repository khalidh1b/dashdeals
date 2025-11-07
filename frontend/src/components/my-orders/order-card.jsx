import { Eye, Download, Trash2, MoreVertical } from "lucide-react";
import { StatusBadge } from "./status-badge";
import { OrderInvoiceGenerator } from "@/lib/pdf-generator";

export const OrderCard = ({ 
  order, 
  onSelectOrder, 
  onDeleteOrder, 
  onToggleMenu, 
  isMenuOpen, 
  isLoading 
}) => {
  const handleDownloadInvoice = () => {
    OrderInvoiceGenerator.generateInvoice(order)
  }

  const handleDeleteOrder = () => {
    onDeleteOrder(order.orderId)
  }

  const handleToggleDropdown = (event) => {
    onToggleMenu(order.orderId, event)
  }

  return (
    <div className="group rounded-lg border border-border bg-card p-4 transition-all md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex-1 min-w-0">
          <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
            <h3 className="text-base font-semibold text-foreground">#ORD-{order.orderId}</h3>
            <StatusBadge status={order.status} />
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            {order.products?.map((product) => (
              <p key={product.id} className="truncate">{product.product_title}</p>
            ))}
            <div className="flex flex-wrap gap-4">
              <span>
                Order Date: <span className="font-medium text-foreground">{order.date}</span>
              </span>
              <span>
                Tracking: <span className="font-medium text-foreground">TRK-{order.trackingId}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 md:items-end">
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Order Total</p>
            <p className="text-2xl font-bold text-foreground">${order.total}</p>
          </div>

          <div className="flex gap-2 relative">
            <button
              onClick={() => onSelectOrder(order)}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              disabled={isLoading}
              aria-label="View order details"
            >
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline sm:ml-2">View</span>
            </button>
            
            <button
              onClick={handleDownloadInvoice}
              className="inline-flex items-center justify-center rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              disabled={isLoading}
              aria-label="Download invoice"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline sm:ml-2">Invoice</span>
            </button>

            <div className="relative">
              <button
                onClick={handleToggleDropdown}
                className="inline-flex items-center justify-center rounded-lg border border-border bg-muted px-3 py-2 text-sm font-medium text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
                disabled={isLoading}
                aria-label="More options"
                aria-expanded={isMenuOpen}
                aria-haspopup="true"
              >
                <MoreVertical className="h-4 w-4" />
              </button>

              {isMenuOpen && (
                <div 
                  className="absolute right-0 top-full mt-1 w-40 rounded-lg border border-border bg-card shadow-lg z-50"
                  onClick={(e) => e.stopPropagation()}
                  role="menu"
                >
                  <button
                    onClick={handleDeleteOrder}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 rounded-lg transition-colors"
                    role="menuitem"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Order
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};