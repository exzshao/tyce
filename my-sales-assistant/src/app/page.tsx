import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Asterisk, AsteriskIcon, Upload } from 'lucide-react'
import { Sidebar } from "./sidebar"

export default function SalesAssistant() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-3xl space-y-8">
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
            <h1 className="text-xl font-medium">Hi Kim, I'm Tyce, your Sales Partner.</h1>
            <p className="text-muted-foreground">I'm here to help you sell projects.</p>
          </div>

          {/* Question */}
          <div className="text-center">
            <p className="text-muted-foreground">What do you need assistance with today?</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-4">
            <Button variant="default" className="w-full">RFP</Button>
            <Button variant="default" className="w-full">Pricing</Button>
            <Button variant="default" className="w-full">Marketing</Button>
            <Button variant="default" className="w-full">Contract</Button>
          </div>

          {/* Search Input and Attachments */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Let me know how I can help you!</p>
            <div className="space-y-2">
              <div className="relative">
                <Input 
                  placeholder="Let me know how I can help you!"
                  className="w-full pl-4 pr-10 bg-white"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AsteriskIcon className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
              <div className="relative">
                <Input 
                  placeholder="Add documents (meeting notes, client briefings) to start a new project"
                  className="w-full pl-4 pr-10 bg-gray-50"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2">
                  <AsteriskIcon className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Deals Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium">Top deals this quarter</h2>
              <button className="rotate-180">^</button>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">App Development</span>
                    <span className="text-sm font-medium">$1M</span>
                  </div>
                  <div>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">Banking</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ERP</span>
                    <span className="text-sm font-medium">$5M</span>
                  </div>
                  <div>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">Banking</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI POCs</span>
                    <span className="text-sm font-medium">$500K</span>
                  </div>
                  <div>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">Industrial</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

