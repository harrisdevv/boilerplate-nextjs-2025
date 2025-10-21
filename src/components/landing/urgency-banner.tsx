'use client'

import { X } from 'lucide-react'
import { useState } from 'react'

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-destructive text-destructive-foreground py-2 px-4 text-center relative">
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <span className="animate-pulse">🔥</span>
        <span>
          <strong>Limited Time:</strong> Early bird pricing ends in 7 days! 
          Lock in lifetime access for just $49 (normally $97)
        </span>
        <span className="animate-pulse">🔥</span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-destructive-foreground/20 rounded p-1"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
