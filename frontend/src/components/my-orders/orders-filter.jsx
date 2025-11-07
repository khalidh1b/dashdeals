const FILTERS = [
  { id: "all", label: "All Orders" },
  { id: "pending", label: "Pending" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
]

export const OrdersFilter = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-2 border-b border-border pb-4">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            activeFilter === filter.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:bg-border"
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
};