import { Card } from "@/components/ui/card"

export function TopDeals() {
  return (
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
  )
} 