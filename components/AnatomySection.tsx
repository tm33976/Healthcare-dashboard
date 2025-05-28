import HealthStatusCards from "./HealthStatusCards"

export default function AnatomySection() {
  const healthStatusData = [
    {
      name: "Lungs",
      date: "Oct 15, 2021",
      status: "critical" as const,
      icon: "🫁",
    },
    {
      name: "Teeth",
      date: "Oct 12, 2021",
      status: "warning" as const,
      icon: "🦷",
    },
    {
      name: "Bone",
      date: "Oct 10, 2021",
      status: "healthy" as const,
      icon: "🦴",
    },
  ]

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="relative">
        {/* Professional 3D Anatomical Model */}
        <div className="flex justify-center mb-6 relative">
          <div className="relative w-72 h-96 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl">
            {/* High-Quality 3D Anatomical Image */}
            <img
              src="/images/anatomy-model.png"
              alt="Professional 3D Human Anatomy Model showing detailed muscular system"
              className="w-full h-full object-cover object-center"
              style={{
                filter: "brightness(1.1) contrast(1.05)",
              }}
            />

            {/* Health indicators positioned around the anatomical model */}
            <div className="absolute -left-24 top-12">
              <div className="flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full shadow-xl border border-green-200 backdrop-blur-sm bg-opacity-95">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-700">Healthy Heart</span>
              </div>
            </div>

            <div className="absolute -right-20 top-16">
              <div className="flex items-center space-x-2 bg-red-100 px-4 py-2 rounded-full shadow-xl border border-red-200 backdrop-blur-sm bg-opacity-95">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-red-700">Lungs</span>
              </div>
            </div>

            <div className="absolute -left-20 top-32">
              <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full shadow-xl border border-yellow-200 backdrop-blur-sm bg-opacity-95">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-yellow-700">Teeth</span>
              </div>
            </div>

            <div className="absolute -right-24 top-52">
              <div className="flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full shadow-xl border border-blue-200 backdrop-blur-sm bg-opacity-95">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-blue-700">Bone</span>
              </div>
            </div>

            <div className="absolute -left-22 bottom-12">
              <div className="flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full shadow-xl border border-purple-200 backdrop-blur-sm bg-opacity-95">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-purple-700">Muscles</span>
              </div>
            </div>

            {/* Subtle overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
          </div>
        </div>

        {/* Health Status Cards */}
        <HealthStatusCards data={healthStatusData} />
      </div>
    </div>
  )
}
