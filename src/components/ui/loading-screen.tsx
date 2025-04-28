import { Loader2 } from "lucide-react"

export function LoadingScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="mt-4 text-xl font-medium text-muted-foreground">Loading...</p>
    </div>
  )
}