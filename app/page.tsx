"use client"

import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Sidebar from "@/components/Sidebar"
import DashboardMainContent from "@/components/DashboardMainContent"
import AppointmentsView from "@/components/AppointmentsView"
import AppointmentModal from "@/components/AppointmentModal"
import type { Appointment } from "@/types/appointment"
import { loadAppointments, saveAppointments } from "@/utils/localStorage"

export default function HealthcareDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null)
  const [currentView, setCurrentView] = useState<"dashboard" | "appointments">("dashboard")

  // Load appointments from localStorage on component mount
  useEffect(() => {
    const savedAppointments = loadAppointments()
    setAppointments(savedAppointments)
  }, [])

  // Save appointments to localStorage whenever appointments change
  useEffect(() => {
    saveAppointments(appointments)
  }, [appointments])

  const handleAddAppointment = (appointmentData: Omit<Appointment, "id">) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(), // Simple ID generation
    }
    setAppointments((prev) => [...prev, newAppointment])
    setIsModalOpen(false)
  }

  const handleEditAppointment = (appointmentData: Omit<Appointment, "id">) => {
    if (editingAppointment) {
      setAppointments((prev) =>
        prev.map((apt) => (apt.id === editingAppointment.id ? { ...appointmentData, id: editingAppointment.id } : apt)),
      )
      setEditingAppointment(null)
      setIsModalOpen(false)
    }
  }

  const handleDeleteAppointment = (appointmentId: string) => {
    setAppointments((prev) => prev.filter((apt) => apt.id !== appointmentId))
  }

  const openAddModal = (date?: Date) => {
    setEditingAppointment(null)
    if (date) {
      setSelectedDate(date)
    }
    setIsModalOpen(true)
  }

  const openEditModal = (appointment: Appointment) => {
    setEditingAppointment(appointment)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingAppointment(null)
  }

  const handleNavigationClick = (view: "dashboard" | "appointments") => {
    setCurrentView(view)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar currentView={currentView} onNavigationClick={handleNavigationClick} />
      <div className="flex-1 flex flex-col">
        <Header onAddAppointment={() => openAddModal()} />

        {currentView === "dashboard" ? (
          <DashboardMainContent
            appointments={appointments}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onAddAppointment={openAddModal}
            onEditAppointment={openEditModal}
            onDeleteAppointment={handleDeleteAppointment}
          />
        ) : (
          <AppointmentsView
            appointments={appointments}
            onEditAppointment={openEditModal}
            onDeleteAppointment={handleDeleteAppointment}
            onAddAppointment={openAddModal}
          />
        )}
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={editingAppointment ? handleEditAppointment : handleAddAppointment}
        selectedDate={selectedDate}
        editingAppointment={editingAppointment}
      />
    </div>
  )
}
