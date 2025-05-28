"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import type { Appointment } from "@/types/appointment"
import { doctorsData, timeSlots } from "@/data/appointmentData"
import { format } from "date-fns"

interface AppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (appointment: Omit<Appointment, "id">) => void
  selectedDate: Date
  editingAppointment?: Appointment | null
}

export default function AppointmentModal({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  editingAppointment,
}: AppointmentModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    doctor: "",
    description: "",
    type: "scheduled" as const,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (editingAppointment) {
      setFormData({
        title: editingAppointment.title,
        date: editingAppointment.date,
        time: editingAppointment.time,
        doctor: editingAppointment.doctor,
        description: editingAppointment.description || "",
        type: editingAppointment.type,
      })
    } else {
      setFormData({
        title: "",
        date: format(selectedDate, "yyyy-MM-dd"),
        time: "",
        doctor: "",
        description: "",
        type: "scheduled",
      })
    }
    setErrors({})
  }, [editingAppointment, selectedDate, isOpen])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }
    if (!formData.date) {
      newErrors.date = "Date is required"
    }
    if (!formData.time) {
      newErrors.time = "Time is required"
    }
    if (!formData.doctor) {
      newErrors.doctor = "Doctor is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSave(formData)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      doctor: "",
      description: "",
      type: "scheduled",
    })
    setErrors({})
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby="appointment-form-description">
        <DialogHeader>
          <DialogTitle>{editingAppointment ? "Edit Appointment" : "Add New Appointment"}</DialogTitle>
        </DialogHeader>

        <div id="appointment-form-description" className="sr-only">
          {editingAppointment
            ? "Edit your existing appointment details"
            : "Create a new appointment by filling out the form below"}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Appointment Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Health Checkup, Dental Cleaning"
              className={errors.title ? "border-red-500" : ""}
              aria-invalid={!!errors.title}
              aria-describedby={errors.title ? "title-error" : undefined}
            />
            {errors.title && (
              <p id="title-error" className="text-sm text-red-500" role="alert">
                {errors.title}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                className={errors.date ? "border-red-500" : ""}
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "date-error" : undefined}
              />
              {errors.date && (
                <p id="date-error" className="text-sm text-red-500" role="alert">
                  {errors.date}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                <SelectTrigger className={errors.time ? "border-red-500" : ""} aria-invalid={!!errors.time}>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {format(new Date(`2000-01-01T${time}`), "HH:mm")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.time && (
                <p id="time-error" className="text-sm text-red-500" role="alert">
                  {errors.time}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="doctor">Doctor/Specialist *</Label>
            <Select value={formData.doctor} onValueChange={(value) => handleInputChange("doctor", value)}>
              <SelectTrigger className={errors.doctor ? "border-red-500" : ""} aria-invalid={!!errors.doctor}>
                <SelectValue placeholder="Select doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctorsData.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.doctor && (
              <p id="doctor-error" className="text-sm text-red-500" role="alert">
                {errors.doctor}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Appointment Type</Label>
            <Select value={formData.type} onValueChange={(value: any) => handleInputChange("type", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Notes (Optional)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Additional notes or instructions..."
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">{editingAppointment ? "Update" : "Save"} Appointment</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
