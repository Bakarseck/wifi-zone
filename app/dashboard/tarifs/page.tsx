"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Edit, Trash } from 'lucide-react'

const initialTarifs = [
  {
    id: 1,
    designation: "Tarif 1",
    prix: 100,
    wifiZone: "Zone 1",
    description: "Description du tarif 1",
  },
  {
    id: 2,
    designation: "Tarif 2",
    prix: 200,
    wifiZone: "Zone 2",
    description: "Description du tarif 2",
  },
]

export default function TarifsPage() {
  const [tarifs, setTarifs] = useState(initialTarifs)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Tarifs</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ajouter un tarif</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau tarif</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Désignation</Label>
                <Input id="designation" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prix">Prix</Label>
                <Input id="prix" type="number" min="0" step="1" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wifiZone">Wifi Zone</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zone1">Zone 1</SelectItem>
                    <SelectItem value="zone2">Zone 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" required />
              </div>
              <Button type="submit" className="w-full">
                Ajouter
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Désignation</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Wifi Zone</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tarifs.map((tarif) => (
              <TableRow key={tarif.id}>
                <TableCell>{tarif.designation}</TableCell>
                <TableCell>{tarif.prix} €</TableCell>
                <TableCell>{tarif.wifiZone}</TableCell>
                <TableCell>{tarif.description}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

