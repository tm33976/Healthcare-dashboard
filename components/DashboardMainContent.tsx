import AnatomySection from "./AnatomySection"
import CalendarView from "./CalendarView"
import UpcomingSchedule from "./UpcomingSchedule"
import ActivityFeed from "./ActivityFeed"
import type { Appointment } from "@/types/appointment"

interface DashboardMainContentProps {
  appointments: Appointment[]
  selectedDate: Date
  onDateSelect: (date: Date) => void
  onAddAppointment: (date?: Date) => void
  onEditAppointment: (appointment: Appointment) => void
  onDeleteAppointment: (appointmentId: string) => void
}

export default function DashboardMainContent({
  appointments,
  selectedDate,
  onDateSelect,
  onAddAppointment,
  onEditAppointment,
  onDeleteAppointment,
}: DashboardMainContentProps) {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Anatomy */}
        <div className="lg:col-span-1">
          <AnatomySection />
        </div>

        {/* Middle Column - Calendar */}
        <div className="lg:col-span-1">
          <CalendarView
            appointments={appointments}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            onAddAppointment={onAddAppointment}
          />
        </div>

        {/* Right Column - Schedule & Activity */}
        <div className="lg:col-span-1 space-y-6">
          <UpcomingSchedule
            appointments={appointments}
            selectedDate={selectedDate}
            onEditAppointment={onEditAppointment}
            onDeleteAppointment={onDeleteAppointment}
            onAddAppointment={onAddAppointment}
          />
          <ActivityFeed />
        </div>
      </div>
    </main>
  )
}
