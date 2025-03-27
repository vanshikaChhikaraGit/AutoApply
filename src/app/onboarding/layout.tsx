import Navbar from "@/components/Navbar"

export default function OnboardingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
   
    return (
      <html lang="en">
        <body lang="en">
          {/* Layout UI */}
          {/* Place children where you want to render a page or nested layout */}
          <Navbar></Navbar>
          <main>
            {children}
            </main>
        </body>
      </html>
    )
  }