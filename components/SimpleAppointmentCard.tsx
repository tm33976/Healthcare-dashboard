"use client"

import { Button } from "@/components/ui/button"
import { Edit2, Trash2, Calendar } from "lucide-react"
import type { Appointment } from "@/types/appointment"
import { format } from "date-fns"

interface SimpleAppointmentCardProps {
  appointment: Appointment
  onEdit: (appointment: Appointment) => void
  onDelete: (appointmentId: string) => void
  showDate?: boolean
}

export default function SimpleAppointmentCard({
  appointment,
  onEdit,
  onDelete,
  showDate = true,
}: SimpleAppointmentCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200"
      case "upcoming":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "scheduled":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getSpecialtyIcon = (doctor: string) => {
    const doctorLower = doctor.toLowerCase()
    if (doctorLower.includes("dentist") || doctorLower.includes("dental")) return "🦷"
    if (doctorLower.includes("cardiologist") || doctorLower.includes("heart")) return "❤️"
    if (doctorLower.includes("neurologist") || doctorLower.includes("neuro")) return "🧠"
    if (doctorLower.includes("ophthalmologist") || doctorLower.includes("eye")) return "👁️"
    if (doctorLower.includes("physiotherapy") || doctorLower.includes("physio")) return "🏃"
    if (doctorLower.includes("dermatologist") || doctorLower.includes("skin")) return "🧴"
    if (doctorLower.includes("orthopedic") || doctorLower.includes("bone")) return "🦴"
    if (doctorLower.includes("pediatrician") || doctorLower.includes("child")) return "👶"
    if (doctorLower.includes("psychiatrist") || doctorLower.includes("mental")) return "🧘"
    return "👨‍⚕️"
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      onDelete(appointment.id)
    }
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(appointment.type)}`}>
        <span className="text-lg">{getSpecialtyIcon(appointment.doctor)}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h4 className="font-semibold text-gray-900 truncate">{appointment.title}</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(appointment.type)}`}>
            {appointment.type}
          </span>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {showDate && format(new Date(appointment.date), "MMM d, yyyy")}{" "}
            {format(new Date(`2000-01-01T${appointment.time}`), "HH:mm")}
          </span>
          <span className="truncate">👨‍⚕️ {appointment.doctor}</span>
        </div>

        {appointment.description && <p className="text-xs text-gray-500 truncate mt-1">{appointment.description}</p>}
      </div>

      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(appointment)}
          className="h-8 w-8 p-0 hover:bg-blue-100"
          title="Edit appointment"
          aria-label="Edit appointment"
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-100"
          title="Delete appointment"
          aria-label="Delete appointment"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
