
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, BellRing, AlertTriangle, Mail, MessageCircle } from "lucide-react";
import { useNotifications } from "@/hooks/use-notifications";

interface NotificationFiltersProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

export function NotificationFilters({
  activeFilter,
  setActiveFilter
}: NotificationFiltersProps) {
  const { notifications } = useNotifications();

  const filters = [
    { id: "all", label: "Toutes", icon: Bell, count: notifications.length },
    { id: "unread", label: "Non lues", icon: BellRing, count: notifications.filter(n => !n.read).length },
    { id: "high", label: "Urgentes", icon: AlertTriangle, count: notifications.filter(n => n.priority === "high").length },
    { id: "messages", label: "Messages", icon: MessageCircle, count: notifications.filter(n => n.type === "message").length },
    { id: "system", label: "Système", icon: Mail, count: notifications.filter(n => n.type === "system").length },
  ];

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Filtres</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "secondary" : "ghost"}
              className="justify-start h-auto py-3 px-4 rounded-none"
              onClick={() => setActiveFilter(filter.id)}
            >
              <filter.icon className="h-4 w-4 mr-2" />
              <span className="flex-1 text-left">{filter.label}</span>
              <span className="bg-muted rounded-full px-2 py-0.5 text-xs">
                {filter.count}
              </span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
