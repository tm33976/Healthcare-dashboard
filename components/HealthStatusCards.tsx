interface HealthStatusCard {
  name: string
  date: string
  status: "healthy" | "warning" | "critical"
  icon: string
}

interface HealthStatusCardsProps {
  data: HealthStatusCard[]
}

export default function HealthStatusCards({ data }: HealthStatusCardsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-100 text-green-700 border-green-200"
      case "warning":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "critical":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(item.status)}`}>
              <span className="text-sm">{item.icon}</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
            {item.status}
          </div>
        </div>
      ))}
    </div>
  )
}
