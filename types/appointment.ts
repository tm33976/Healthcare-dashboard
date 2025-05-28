export interface Appointment {
  id: string
  title: string
  date: string // YYYY-MM-DD format
  time: string // HH:MM format
  doctor: string
  description?: string
  type: "completed" | "upcoming" | "scheduled"
}
