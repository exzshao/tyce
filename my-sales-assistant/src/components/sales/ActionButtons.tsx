import { Button } from "@/components/ui/button"

export function ActionButtons() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Button variant="default" className="w-full">RFP</Button>
      <Button variant="default" className="w-full">Pricing</Button>
      <Button variant="default" className="w-full">Marketing</Button>
      <Button variant="default" className="w-full">Contract</Button>
    </div>
  )
} 