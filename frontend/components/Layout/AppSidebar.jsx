"use client"

import { Calendar, Home, Search, Settings, Star, TrendingUp } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const menuItems = [
  { 
    title: "Feed", 
    url: "/", 
    icon: Home,
    color: "text-blue-500",
    activeColor: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
  },
  { 
    title: "Trending", 
    url: "/trending", 
    icon: TrendingUp,
    color: "text-green-500",
    activeColor: "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
  },
  { 
    title: "Favorites", 
    url: "/favorites", 
    icon: Star,
    color: "text-yellow-500 dark:text-yellow-400",
    activeColor: "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
  },
  { 
    title: "Search", 
    url: "/search", 
    icon: Search,
    color: "text-purple-500",
    activeColor: "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800"
  },
  { 
    title: "Settings", 
    url: "/settings", 
    icon: Settings,
    color: "text-gray-500 dark:text-gray-400",
    activeColor: "bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="w-64 border-r border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <SidebarHeader className=" border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-blue-50 dark:border-gray-700 dark:from-indigo-900/30 dark:to-blue-900/30">
        <div className="flex items-center gap-3 px-4 py-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-md">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-gray-800 dark:text-gray-100">Content Hub</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">Manage your content</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="bg-gray-50/50 dark:bg-gray-900/50">
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupLabel className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3 px-3">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`
                        relative group transition-all duration-200 ease-in-out
                        hover:bg-white hover:shadow-sm hover:border hover:border-gray-200
                        dark:hover:bg-gray-800 dark:hover:border-gray-600
                        rounded-md mx-1 my-0.5 px-4 py-3
                        ${isActive 
                          ? `${item.activeColor} shadow-sm border font-semibold` 
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
                        }
                      `}
                    >
                      <Link href={item.url} className="flex items-center gap-4 w-full">
                        <div className={`
                          flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200
                          ${isActive 
                            ? `${item.color.replace('text-', 'bg-').replace('500', '100')} ${item.color}` 
                            : `${item.color} group-hover:bg-gray-100 dark:group-hover:bg-gray-700`
                          }
                        `}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="font-semibold text-base">{item.title}</span>
                        {isActive && (
                          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-r-full"></div>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Optional: Add a bottom section with user info or additional actions */}
        <div className="mt-auto p-4 border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
          <div className="flex items-center gap-3 px-3 py-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-600 dark:to-gray-800 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">U</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-700 dark:text-gray-300">User</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">user@example.com</div>
            </div>
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}