import { X } from "lucide-react";
import { StatusBadge } from "./status-badge";

export const OrderDetailModal = ({ order, onClose }) => {

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 transition-opacity" onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-lg bg-[#FFFFFF] shadow-lg border border-border">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">Order Details</h2>
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  Order ID: <span className="font-semibold text-foreground">#ORD-{order.orderId}</span>
                </p>
                <StatusBadge status={order.status} />
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Order Date</p>
                  <p className="text-sm font-medium text-foreground">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Tracking ID</p>
                  <p className="text-sm font-medium text-foreground">TRK-{order.trackingId}</p>
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Items Ordered</p>
                {order.products.map((o) => (
                    <p key={o.productId} className="text-sm font-medium text-foreground">{o.product_title}</p>
                ))}
              </div>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">Order Total</p>
                <p className="text-3xl font-bold text-foreground">${order.total}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full rounded-lg bg-accent text-accent-foreground font-medium py-2 px-4 transition-all hover:bg-accent/90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  )
};