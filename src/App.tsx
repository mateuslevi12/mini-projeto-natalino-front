import { AppRoutes } from "./Routes"
import { AuthProvider } from "./lib/AuthContext"
import { Toaster } from "@/components/ui/toaster"

export function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </>
  )
}
