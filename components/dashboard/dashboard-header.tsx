import { LogoutButton } from "@/components/auth/logout-button"
import { Bell, Settings, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface DashboardHeaderProps {
  user: any
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/dashboard">
                <h1 className="text-xl font-bold text-blue-600">AI Risk Prediction</h1>
              </Link>
            </div>
            <nav className="hidden md:ml-8 md:flex md:space-x-8">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Dashboard
              </Link>
              <Link
                href="/alerts"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center gap-1"
              >
                <AlertTriangle className="h-4 w-4" />
                Alerts
              </Link>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">
              Welcome, {user?.first_name} {user?.last_name}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
              {user?.role}
            </span>
            <Link href="/alerts">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  )
}
