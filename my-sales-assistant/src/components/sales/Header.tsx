import { Asterisk } from 'lucide-react'

export function Header() {
  return (
    <>
      {/* New Project Text with Underline */}
      <div className="text-center">
        <h2 className="text-sm font-medium">New Project</h2>
        <div className="mt-1 mx-auto w-16 h-px bg-gray-300"></div>
      </div>

      {/* Logo */}
      <div className="flex justify-center">
        <Asterisk className="h-24 w-24" />
      </div>

      {/* Welcome Message */}
      <div className="space-y-2 text-center">
        <h1 className="text-xl font-medium">Hi Kim, I&apos;m Tyce, your Sales Partner.</h1>
        <p className="text-muted-foreground">I&apos;m here to help you sell projects.</p>
      </div>

      {/* Question */}
      <div className="text-center">
        <p className="text-muted-foreground">What do you need assistance with today?</p>
      </div>
    </>
  )
} 