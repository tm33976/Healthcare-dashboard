"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Appointment } from "@/types/appointment"
import { isSameDay, format, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns"

interface CalendarViewProps {
  appointments: Appointment[]
  selectedDate: Date
  onDateSelect: (date: Date) => void
  onAddAppointment: (date?: Date) => void
}

export default function CalendarView({
  appointments,
  selectedDate,
  onDateSelect,
  onAddAppointment,
}: CalendarViewProps) {
  const currentMonth = new Date(2021, 9) // October 2021 to match original design
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Add empty cells for days before the first day of the month
  const startDay = getDay(monthStart)
  const emptyCells = Array(startDay).fill(null)

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const getAppointmentsForDate = (date: Date) => {
    return appointments.filter((apt) => isSameDay(new Date(apt.date), date))
  }

  const isSelected = (date: Date) => {
    return isSameDay(date, selectedDate)
  }

  const isToday = (date: Date) => {
    return isSameDay(date, new Date(2021, 9, 15)) // October 15, 2021 as "today"
  }

  const handleDateClick = (date: Date) => {
    onDateSelect(date)
  }

  const handleAddAppointmentForDate = (date: Date, e: React.MouseEvent) => {
    e.stopPropagation()
    onAddAppointment(date)
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">October 2021</h3>
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

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}

          {/* Empty cells for days before month start */}
          {emptyCells.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square"></div>
          ))}

          {/* Calendar days */}
          {daysInMonth.map((date) => {
            const dayAppointments = getAppointmentsForDate(date)
            const hasAppointments = dayAppointments.length > 0
            const selected = isSelected(date)
            const today = isToday(date)

            return (
              <div key={date.toISOString()} className="aspect-square">
                <div
                  className={`w-full h-full flex flex-col items-center justify-center text-sm rounded-lg cursor-pointer transition-colors relative group ${
                    today
                      ? "bg-blue-500 text-white"
                      : selected
                        ? "bg-blue-100 text-blue-700 ring-2 ring-blue-500"
                        : hasAppointments
                          ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                          : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => handleDateClick(date)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${format(date, "MMMM d, yyyy")}${hasAppointments ? `, ${dayAppointments.length} appointment${dayAppointments.length > 1 ? "s" : ""}` : ""}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      handleDateClick(date)
                    }
                  }}
                >
                  <span className="font-medium">{format(date, "d")}</span>

                  {/* Appointment indicators */}
                  {hasAppointments && (
                    <div className="flex flex-col items-center mt-1">
                      {dayAppointments.slice(0, 2).map((apt, i) => (
                        <span key={i} className="text-xs">
                          {format(new Date(`2000-01-01T${apt.time}`), "HH:mm")}
                        </span>
                      ))}
                      {dayAppointments.length > 2 && <span className="text-xs">+{dayAppointments.length - 2}</span>}
                    </div>
                  )}

                  {/* Add appointment button on hover */}
                  <button
                    className="absolute top-1 right-1 w-4 h-4 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    onClick={(e) => handleAddAppointmentForDate(date, e)}
                    title="Add appointment"
                    aria-label={`Add appointment for ${format(date, "MMMM d")}`}
                  >
                    <Plus className="w-2 h-2" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Date Appointments */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700">Appointments for {format(selectedDate, "MMMM d, yyyy")}</h4>
        {getAppointmentsForDate(selectedDate).length > 0 ? (
          getAppointmentsForDate(selectedDate).map((appointment) => (
            <div key={appointment.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-sm">📅</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{appointment.title}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(`2000-01-01T${appointment.time}`), "HH:mm")} - {appointment.doctor}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">No appointments scheduled</p>
            <Button variant="outline" size="sm" onClick={() => onAddAppointment(selectedDate)} className="mt-2">
              <Plus className="w-4 h-4 mr-1" />
              Add Appointment
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
