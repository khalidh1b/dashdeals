import { Package, Clock, CheckCircle2, XCircle } from "lucide-react"

export const OrderStats = ({ stats }) => {
  const statCards = [
    {
      label: "Total Orders",
      value: stats.total,
      icon: Package,
      color: "text-primary",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "text-yellow-600 dark:text-yellow-400",
    },
    {
      label: "Delivered",
      value: stats.delivered,
      icon: CheckCircle2,
      color: "text-green-600 dark:text-green-400",
    },
    {
      label: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      color: "text-destructive",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-accent hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div
                className={`rounded-full border p-3 transition-colors group-hover:bg-accent group-hover:bg-opacity-10 ${stat.color}`}
              >
                <Icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
};