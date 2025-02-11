"use client"
//need to add other things too
import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const {theme, setTheme} = useTheme()

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light") 
    } else {
      setTheme("dark") 
    }
  }

  return (
      <div className="flex">
        <Button variant="outline"
      size="icon" className={`h-8 w-8 cursor-pointer`} onClick={toggleTheme}>A</Button>
      </div>  
  )
}
