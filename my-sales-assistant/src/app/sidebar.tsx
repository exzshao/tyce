import { Plus, FileText, Wifi, Settings, Asterisk } from 'lucide-react'
import { cn } from "@/lib/utils"

const menuItems = [
  { icon: Plus, label: 'Add' },
  { icon: FileText, label: 'New Page' },
  { icon: Wifi, label: 'Wifi' },
  { icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  return (
    <div className="w-16 bg-white h-screen p-4">
      {/* Add logo */}
      <div className="flex justify-center mb-8">
        <Asterisk className="h-6 w-6" />
      </div>
      <div className="space-y-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={cn(
              "flex items-center justify-center hover:bg-gray-200 w-full p-2 rounded-md transition-colors",
              index === 0 && "bg-gray-200"
            )}
            aria-label={item.label}
          >
            <item.icon className="h-6 w-6" />
          </button>
        ))}
      </div>
    </div>
  )
}

