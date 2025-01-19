"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wifi, Tag, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, fetchProtectedData } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const wifiZonesResponse = await fetchProtectedData("/api/wifi-zones/list");
        console.log("Fetched WiFi Zones:", wifiZonesResponse.wifiZones);

        // Calculate stats dynamically
        const totalWifiZones = wifiZonesResponse.wifiZones.length;
        const totalTariffs = wifiZonesResponse.wifiZones.reduce(
          (sum, zone) => sum + zone.tariffs.length,
          0
        );
        const totalTickets = wifiZonesResponse.wifiZones.reduce(
          (sum, zone) =>
            sum +
            zone.tariffs.reduce(
              (tariffSum, tariff) => tariffSum + tariff.tickets.length,
              0
            ),
          0
        );

        // Update stats state
        setStats([
          {
            title: "Wifi Zones",
            value: totalWifiZones.toString(),
            icon: Wifi,
            description: "Zones Wifi actives",
          },
          {
            title: "Tarifs",
            value: totalTariffs.toString(),
            icon: Tag,
            description: "Tarifs configurés",
          },
          {
            title: "Tickets",
            value: totalTickets.toString(),
            icon: Ticket,
            description: "Tickets générés",
          },
        ]);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching stats or WiFi zones:", err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!stats && user) {
      fetchStats();
    }
  }, [stats, user, fetchProtectedData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-600 rounded-md">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Bonjour, {user?.name || "Utilisateur"}!</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats?.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
