"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignupPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
  
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const phone = formData.get("phone") as string
    const terms = formData.get("terms") as string
  
    // Basic Validation
    if (!email.includes("@")) {
      setIsLoading(false)
      alert("Veuillez saisir une adresse e-mail valide.")
      return
    }
  
    if (password !== confirmPassword) {
      setIsLoading(false)
      alert("Les mots de passe ne correspondent pas.")
      return
    }
  
    if (phone.length < 7) {
      setIsLoading(false)
      alert("Le numéro de téléphone doit comporter au moins 7 chiffres.")
      return
    }
  
    if (!terms) {
      setIsLoading(false)
      alert("Vous devez accepter les conditions d'utilisation.")
      return
    }
  
    // Send data to the backend
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        alert(errorData.error || "Une erreur est survenue lors de l'inscription.")
        setIsLoading(false)
        return
      }
  
      // On success, redirect to login
      alert("Compte créé avec succès. Vous pouvez maintenant vous connecter.")
      router.push("/login")
    } catch (error) {
      console.error("Error during registration:", error)
      alert("Une erreur inattendue est survenue.")
    } finally {
      setIsLoading(false)
    }
  }
  

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Créer un compte</CardTitle>
          <CardDescription>
            Remplissez le formulaire ci-dessous pour créer votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" name="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                J'accepte les conditions d'utilisation
              </label>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Création du compte..." : "S'inscrire"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Vous avez déjà un compte?{" "}
            <Link href="/login" className="underline">
              Se connecter
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

