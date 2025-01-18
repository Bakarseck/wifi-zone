import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Tag, Ticket } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: "Wifi Zones",
      value: "3",
      icon: Wifi,
      description: "Zones Wifi actives",
    },
    {
      title: "Tarifs",
      value: "5",
      icon: Tag,
      description: "Tarifs configurés",
    },
    {
      title: "Tickets",
      value: "150",
      icon: Ticket,
      description: "Tickets générés",
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Bonjour, John Doe</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
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
  )
}

