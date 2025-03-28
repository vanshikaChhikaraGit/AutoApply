export default function LandingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
   
    return (
        <body lang="en">
          {/* Layout UI */}
          {/* Place children where you want to render a page or nested layout */}
          <main>
            
            {children}
            </main>
        </body>
    )
  }