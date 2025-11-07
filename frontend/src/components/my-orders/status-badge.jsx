export const STATUS_CONFIG = {
  pending: {
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-300",
    label: "Pending",
  },
  delivered: {
    bg: "bg-green-100 dark:bg-green-900/30",
    text: "text-green-700 dark:text-green-300",
    label: "Delivered",
  },
  cancelled: {
    bg: "bg-red-100 dark:bg-red-900/30",
    text: "text-red-700 dark:text-red-300",
    label: "Cancelled",
  },
}

export function StatusBadge({ status }) {
  const badge = STATUS_CONFIG[status]
  
  if (!badge) {
    return null
  }

  return (
    <div
      className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${badge.bg} ${badge.text}`}
    >
      {badge.label}
    </div>
  )
};