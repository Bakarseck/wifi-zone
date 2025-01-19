'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash } from 'lucide-react';

export default function WifiZonesPage() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    dns: '',
    contact: '',
    system: '',
  });
  const [isEdit, setIsEdit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // Fonction pour récupérer les WiFi Zones
  const fetchZones = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User is not authenticated');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/wifi-zones/list', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to fetch WiFi zones');
      setZones(data.wifiZones);
    } catch (err) {
      console.error('Fetch error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Gérer les changements dans les champs du formulaire
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Ajouter ou modifier une WiFi Zone
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User is not authenticated');
      return;
    }

    const method = isEdit ? 'PUT' : 'POST';
    const endpoint = isEdit
      ? `/api/wifi-zones/${formData.id}`
      : '/api/wifi-zones/create';

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to save WiFi Zone');
      setFormData({
        id: null,
        name: '',
        description: '',
        dns: '',
        contact: '',
        system: '',
      });
      setIsEdit(false);
      setShowDialog(false); // Fermer le popup
      fetchZones();
    } catch (err) {
      setError(err.message);
    }
  };

  // Supprimer une WiFi Zone
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('User is not authenticated');
      return;
    }

    try {
      const response = await fetch(`/api/wifi-zones/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Failed to delete WiFi Zone');
      fetchZones();
    } catch (err) {
      setError(err.message);
    }
  };

  // Préparer les données pour l'édition
  const handleEdit = (zone) => {
    setFormData(zone);
    setIsEdit(true);
    setShowDialog(true); // Ouvrir le popup
  };

  useEffect(() => {
    fetchZones();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Wifi Zones</h2>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setFormData({
                  id: null,
                  name: '',
                  description: '',
                  dns: '',
                  contact: '',
                  system: '',
                });
                setIsEdit(false);
                setShowDialog(true); // Ouvrir le popup
              }}
            >
              Ajouter une zone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEdit ? 'Modifier la zone' : 'Ajouter une nouvelle Wifi Zone'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dns">DNS</Label>
                <Input
                  id="dns"
                  value={formData.dns}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact">Contact</Label>
                <Input
                  id="contact"
                  type="tel"
                  value={formData.contact}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="system">Système de gestion</Label>
                <Select
                  value={formData.system}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, system: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un système" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mik">Mik</SelectItem>
                    <SelectItem value="Graze">Graze</SelectItem>
                    <SelectItem value="True">True</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {isEdit ? 'Modifier' : 'Ajouter'}
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(zone)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(zone.id)}
                    >
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
  );
}
