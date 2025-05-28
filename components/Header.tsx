"use client"

import { Search, Bell, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onAddAppointment: () => void
}

export default function Header({ onAddAppointment }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-gray-900">Healthcare.</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search..." className="pl-10 w-80 bg-gray-50 border-gray-200" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="w-5 h-5 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onAddAppointment}
            title="Add Appointment"
            aria-label="Add Appointment"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">TM</span>
            </div>
            <span className="text-gray-700 font-medium">Tushar Mishra</span>
          </div>
        </div>
      </div>
    </header>
  )
}
