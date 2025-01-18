import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold text-white">WifiZone</h1>
        <div className="space-x-4">
          <Button variant="outline" asChild>
            <Link href="/login">Connexion</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Inscription</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex min-h-[calc(100vh-80px)] items-center justify-center px-6 text-center">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            Gérez vos zones Wifi simplement et efficacement
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-200">
            Une solution complète pour administrer vos zones Wifi, créer des tarifs personnalisés et gérer vos tickets d'accès.
          </p>
          <Button size="lg" asChild>
            <Link href="/signup">
              Découvrir nos services
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

