"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Appointment } from "@/types/appointment"
import SimpleAppointmentCard from "./SimpleAppointmentCard"
import { format, isAfter, isSameDay, startOfDay } from "date-fns"

interface UpcomingScheduleProps {
  appointments: Appointment[]
  selectedDate: Date
  onEditAppointment: (appointment: Appointment) => void
  onDeleteAppointment: (appointmentId: string) => void
  onAddAppointment: (date?: Date) => void
}

export default function UpcomingSchedule({
  appointments,
  selectedDate,
  onEditAppointment,
  onDeleteAppointment,
  onAddAppointment,
}: UpcomingScheduleProps) {
  // Filter appointments for the selected date and upcoming dates
  const upcomingAppointments = appointments
    .filter((apt) => {
      const aptDate = new Date(apt.date)
      return isAfter(aptDate, startOfDay(selectedDate)) || isSameDay(aptDate, selectedDate)
    })
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`)
      const dateB = new Date(`${b.date}T${b.time}`)
      return dateA.getTime() - dateB.getTime()
    })

  // Group appointments by date
  const groupedAppointments = upcomingAppointments.reduce(
    (groups, apt) => {
      const dateKey = format(new Date(apt.date), "yyyy-MM-dd")
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(apt)
      return groups
    },
    {} as Record<string, Appointment[]>,
  )

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">The Upcoming Schedule</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddAppointment()}
          className="text-blue-600 hover:text-blue-700"
          aria-label="Add new appointment"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>

      {Object.keys(groupedAppointments).length > 0 ? (
        <div className="space-y-4">
          {Object.entries(groupedAppointments)
            .slice(0, 5)
            .map(([dateKey, dayAppointments]) => {
              const date = new Date(dateKey)
              const isSelectedDate = isSameDay(date, selectedDate)

              return (
                <div key={dateKey}>
                  <h4 className={`text-sm font-medium mb-2 ${isSelectedDate ? "text-blue-600" : "text-gray-500"}`}>
                    {isSelectedDate ? "Selected Date" : format(date, "EEEE, MMMM d")}
                  </h4>
                  <div className="space-y-2">
                    {dayAppointments.map((appointment) => (
                      <SimpleAppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onEdit={onEditAppointment}
                        onDelete={onDeleteAppointment}
                      />
                    ))}
                  </div>
                </div>
              )
            })}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No upcoming appointments</p>
          <Button variant="outline" onClick={() => onAddAppointment()}>
            <Plus className="w-4 h-4 mr-2" />
            Schedule Your First Appointment
          </Button>
        </div>
      )}
    </div>
  )
}
