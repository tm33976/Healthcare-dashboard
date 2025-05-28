"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Filter } from "lucide-react"
import type { Appointment } from "@/types/appointment"
import SimpleAppointmentCard from "./SimpleAppointmentCard"
import { format } from "date-fns"

interface AppointmentsViewProps {
  appointments: Appointment[]
  onEditAppointment: (appointment: Appointment) => void
  onDeleteAppointment: (appointmentId: string) => void
  onAddAppointment: (date?: Date) => void
}

export default function AppointmentsView({
  appointments,
  onEditAppointment,
  onDeleteAppointment,
  onAddAppointment,
}: AppointmentsViewProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "upcoming" | "completed" | "scheduled">("all")
  const [sortBy, setSortBy] = useState<"date" | "doctor" | "title">("date")

  // Filter and sort appointments
  const filteredAppointments = appointments
    .filter((apt) => {
      // Search filter
      const matchesSearch =
        apt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.description?.toLowerCase().includes(searchTerm.toLowerCase())

      // Type filter
      const matchesType = filterType === "all" || apt.type === filterType

      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          const dateA = new Date(`${a.date}T${a.time}`)
          const dateB = new Date(`${b.date}T${b.time}`)
          return dateA.getTime() - dateB.getTime()
        case "doctor":
          return a.doctor.localeCompare(b.doctor)
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  // Group appointments by date
  const groupedAppointments = filteredAppointments.reduce(
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

  const getTypeStats = () => {
    const stats = {
      total: appointments.length,
      upcoming: appointments.filter((apt) => apt.type === "upcoming").length,
      completed: appointments.filter((apt) => apt.type === "completed").length,
      scheduled: appointments.filter((apt) => apt.type === "scheduled").length,
    }
    return stats
  }

  const stats = getTypeStats()

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
            <p className="text-gray-600">Manage your healthcare appointments</p>
          </div>
          <Button onClick={() => onAddAppointment()} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Appointment
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Appointments</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">{stats.upcoming}</div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">{stats.scheduled}</div>
            <div className="text-sm text-gray-600">Scheduled</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="doctor">Sort by Doctor</SelectItem>
                  <SelectItem value="title">Sort by Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg border border-gray-200">
          {Object.keys(groupedAppointments).length > 0 ? (
            <div className="divide-y divide-gray-200">
              {Object.entries(groupedAppointments).map(([dateKey, dayAppointments]) => (
                <div key={dateKey} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {format(new Date(dateKey), "EEEE, MMMM d, yyyy")}
                  </h3>
                  <div className="space-y-3">
                    {dayAppointments.map((appointment) => (
                      <SimpleAppointmentCard
                        key={appointment.id}
                        appointment={appointment}
                        onEdit={onEditAppointment}
                        onDelete={onDeleteAppointment}
                        showDate={false}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Calendar className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || filterType !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by scheduling your first appointment"}
              </p>
              <Button onClick={() => onAddAppointment()} variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Appointment
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
