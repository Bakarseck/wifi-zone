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

const initialZones = [
  {
    id: 1,
    name: "Zone 1",
    description: "Description de la zone 1",
    dns: "zone1.example.com",
    contact: "0123456789",
    system: "Mik",
  },
  {
    id: 2,
    name: "Zone 2",
    description: "Description de la zone 2",
    dns: "zone2.example.com",
    contact: "0123456789",
    system: "Graze",
  },
]

export default function WifiZonesPage() {
  const [zones, setZones] = useState(initialZones)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Wifi Zones</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Ajouter une zone</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une nouvelle Wifi Zone</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input id="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dns">DNS</Label>
                <Input id="dns" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="system">Système de gestion</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un système" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mik">Mik</SelectItem>
                    <SelectItem value="graze">Graze</SelectItem>
                    <SelectItem value="true">True</SelectItem>
                  </SelectContent>
                </Select>
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
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>DNS</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Système</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {zones.map((zone) => (
              <TableRow key={zone.id}>
                <TableCell>{zone.name}</TableCell>
                <TableCell>{zone.description}</TableCell>
                <TableCell>{zone.dns}</TableCell>
                <TableCell>{zone.contact}</TableCell>
                <TableCell>{zone.system}</TableCell>
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

