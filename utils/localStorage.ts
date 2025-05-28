import type { Appointment } from "@/types/appointment"

const APPOINTMENTS_KEY = "healthcare_appointments"

export const loadAppointments = (): Appointment[] => {
  if (typeof window === "undefined") return []

  try {
    const stored = localStorage.getItem(APPOINTMENTS_KEY)
    return stored ? JSON.parse(stored) : getDefaultAppointments()
  } catch (error) {
    console.error("Error loading appointments from localStorage:", error)
    return getDefaultAppointments()
  }
}

export const saveAppointments = (appointments: Appointment[]): void => {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments))
  } catch (error) {
    console.error("Error saving appointments to localStorage:", error)
  }
}

// Default appointments for initial load with Indian doctor names
const getDefaultAppointments = (): Appointment[] => [
  {
    id: "1",
    title: "Health checkup complete",
    date: "2021-10-14",
    time: "09:00",
    doctor: "Dr. Rajesh Sharma - General Practitioner",
    type: "completed",
    description: "Annual health checkup completed successfully",
  },
  {
    id: "2",
    title: "Dentist Appointment",
    date: "2021-10-15",
    time: "11:00",
    doctor: "Dr. Priya Patel - Dentist",
    type: "upcoming",
    description: "Regular dental cleaning and checkup",
  },
  {
    id: "3",
    title: "Physiotherapy Session",
    date: "2021-10-16",
    time: "14:00",
    doctor: "Dr. Amit Kumar - Physiotherapist",
    type: "scheduled",
    description: "Physical therapy for back pain",
  },
  {
    id: "4",
    title: "Cardiologist Consultation",
    date: "2021-10-18",
    time: "10:00",
    doctor: "Dr. Sunita Gupta - Cardiologist",
    type: "scheduled",
    description: "Heart health consultation",
  },
  {
    id: "5",
    title: "Ophthalmologist Checkup",
    date: "2021-10-20",
    time: "15:00",
    doctor: "Dr. Vikram Singh - Ophthalmologist",
    type: "scheduled",
    description: "Eye examination and vision test",
  },
]
