"use client"

import {
  LayoutDashboard,
  History,
  Calendar,
  Clock,
  BarChart3,
  TestTube,
  MessageCircle,
  HelpCircle,
  Settings,
} from "lucide-react"

interface SidebarProps {
  currentView: "dashboard" | "appointments"
  onNavigationClick: (view: "dashboard" | "appointments") => void
}

export default function Sidebar({ currentView, onNavigationClick }: SidebarProps) {
  const navigationLinks = [
    { name: "Dashboard", icon: LayoutDashboard, view: "dashboard" as const, active: currentView === "dashboard" },
    { name: "History", icon: History, view: null, active: false },
    { name: "Calendar", icon: Calendar, view: null, active: false },
    { name: "Appointments", icon: Clock, view: "appointments" as const, active: currentView === "appointments" },
    { name: "Statistics", icon: BarChart3, view: null, active: false },
    { name: "Tests", icon: TestTube, view: null, active: false },
    { name: "Chat", icon: MessageCircle, view: null, active: false },
    { name: "Support", icon: HelpCircle, view: null, active: false },
    { name: "Setting", icon: Settings, view: null, active: false },
  ]

  const handleLinkClick = (link: (typeof navigationLinks)[0]) => {
    if (link.view) {
      onNavigationClick(link.view)
    }
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">General</h2>
        <nav className="space-y-2" role="navigation" aria-label="Main navigation">
          {navigationLinks.map((link, index) => {
            const IconComponent = link.icon
            return (
              <button
                key={index}
                onClick={() => handleLinkClick(link)}
                disabled={!link.view}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                  link.active
                    ? "bg-blue-50 text-blue-700"
                    : link.view
                      ? "text-gray-600 hover:bg-gray-50 hover:text-gray-900 cursor-pointer"
                      : "text-gray-400 cursor-not-allowed"
                }`}
                aria-current={link.active ? "page" : undefined}
              >
                <IconComponent className="w-5 h-5" />
                <span>{link.name}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
