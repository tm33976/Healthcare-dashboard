export const upcomingScheduleData = [
  {
    day: "On Thursday",
    appointments: [
      {
        title: "Health checkup complete",
        time: "09:00 - 10:00",
        icon: "✅",
        type: "completed" as const,
      },
      {
        title: "Ophthalmologist",
        time: "11:00 - 12:00",
        icon: "👁️",
        type: "upcoming" as const,
      },
    ],
  },
  {
    day: "On Saturday",
    appointments: [
      {
        title: "Cardiologist",
        time: "14:00 - 15:00",
        icon: "❤️",
        type: "scheduled" as const,
      },
      {
        title: "Neurologist",
        time: "16:00 - 17:00",
        icon: "🧠",
        type: "scheduled" as const,
      },
    ],
  },
]
