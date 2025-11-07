import { ChevronRight } from "lucide-react"
import { Link } from "react-router-dom"

export const EmptyOrdersState = () => {
  return (
    <div className="rounded-lg border border-border bg-card p-12 text-center">
      <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Link to="/">
            <ChevronRight className="h-6 w-6 text-muted-foreground" />
        </Link>
      </div>
      <p className="text-lg font-medium text-foreground">No orders found</p>
      <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or browse our store</p>
    </div>
  )
};