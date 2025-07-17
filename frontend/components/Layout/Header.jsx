"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Search, Loader2, Moon, Sun, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { toggleDarkMode } from "@/store/slices/preferencesSlice"
import { setSearchQuery } from "@/store/slices/contentSlice"
import { useDebounce } from "@/hooks/useDebounce"
import { useRouter } from "next/navigation"

export function Header() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { darkMode } = useSelector((state) => state.preferences)
  const [searchInput, setSearchInput] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearch = useDebounce(searchInput, 300)

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearchSubmit = async (e) => {
    e.preventDefault()
    if (debouncedSearch.trim()) {
      setIsSearching(true)
      dispatch(setSearchQuery(debouncedSearch))
      router.push("/search")
      // Optional delay to show animation for smoother UX
      await new Promise((res) => setTimeout(res, 500))
      setIsSearching(false)
    }
  }

  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode())
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-gradient-to-r dark:from-slate-800 dark:to-teal-900">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex flex-1 items-center gap-4 justify-between">
        <form onSubmit={handleSearchSubmit} className="flex flex-1 max-w-md gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              value={searchInput}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          <Button
            type="submit"
            variant="default"
            size="icon"
            disabled={!searchInput.trim() || isSearching}
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </form>

        <div className="flex items-end justify-end gap-2">
          <Button variant="ghost" size="icon" onClick={handleDarkModeToggle} className="h-8 w-8">
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 flex">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
