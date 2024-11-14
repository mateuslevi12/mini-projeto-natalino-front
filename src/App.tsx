import { AppRoutes } from "./Routes"
import Layout from "./layout"
import { AuthProvider } from "./lib/AuthContext"

export function App() {

  return (
    <>
      <AuthProvider>
        <Layout>
          <AppRoutes />
        </Layout>
      </AuthProvider>
    </>
  )
}
