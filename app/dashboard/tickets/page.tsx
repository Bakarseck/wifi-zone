"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trash } from 'lucide-react'

const initialTickets = [
  {
    id: 1,
    utilisateur: "user1",
    password: "pass1",
    tarif: "Tarif 1",
    etat: "Actif",
  },
  {
    id: 2,
    utilisateur: "user2",
    password: "pass2",
    tarif: "Tarif 2",
    etat: "Inactif",
  },
]

export default function TicketsPage() {
  const [tickets, setTickets] = useState(initialTickets)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Tickets</h2>
      </div>

      <div className="rounded-md border p-4">
        <form className="flex items-end gap-4">
          <div className="space-y-2">
            <Label htmlFor="tarif">Tarif</Label>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sélectionner un tarif" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tarif1">Tarif 1</SelectItem>
                <SelectItem value="tarif2">Tarif 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="csv">Fichier CSV</Label>
            <Input id="csv" type="file" accept=".csv" />
          </div>
          <Button type="submit">Importer</Button>
        </form>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Utilisateur</TableHead>
              <TableHead>Mot de passe</TableHead>
              <TableHead>Tarif</TableHead>
              <TableHead>État</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.utilisateur}</TableCell>
                <TableCell>{ticket.password}</TableCell>
                <TableCell>{ticket.tarif}</TableCell>
                <TableCell>{ticket.etat}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

