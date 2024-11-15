import { AppRoutes } from "./Routes"
import { AuthProvider } from "./lib/AuthContext"

export function App() {

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  )
}
