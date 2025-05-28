export default function ActivityFeed() {
  const activityData = [
    { day: "Mon", appointments: 2 },
    { day: "Tue", appointments: 1 },
    { day: "Wed", appointments: 3 },
    { day: "Thu", appointments: 0 },
    { day: "Fri", appointments: 1 },
    { day: "Sat", appointments: 2 },
    { day: "Sun", appointments: 1 },
  ]

  const maxAppointments = Math.max(...activityData.map((d) => d.appointments))

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Activity</h3>
      <p className="text-sm text-gray-600 mb-4">3 appointments on this week</p>

      {/* Simple Bar Chart */}
      <div className="flex items-end space-x-2 h-32">
        {activityData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-blue-200 rounded-t-sm mb-2 transition-all duration-300"
              style={{
                height: `${(data.appointments / maxAppointments) * 80}px`,
                minHeight: data.appointments > 0 ? "8px" : "2px",
              }}
            ></div>
            <span className="text-xs text-gray-500">{data.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
