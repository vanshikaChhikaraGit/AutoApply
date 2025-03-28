import Navbar from "@/components/Navbar"
import { AuthProvider } from "@/context/Auth-Context"

export default function OnboardingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
   
    return (
        <body lang="en">
          {/* Layout UI */}
          {/* Place children where you want to render a page or nested layout */}
          <Navbar></Navbar>
          <main>
            <AuthProvider>
            {children}
            </AuthProvider>
            </main>
        </body>
    )
  }