
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNotifications } from "@/hooks/use-notifications";
import { NotificationItem } from "@/components/notifications/NotificationItem";
import { Search, BellOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface NotificationListProps {
  activeFilter: string;
}

export function NotificationList({ activeFilter }: NotificationListProps) {
  const { notifications, markAllAsRead, clearAllNotifications } = useNotifications();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Apply filters
  const filteredNotifications = notifications
    .filter(notification => {
      // Filter by type/status
      if (activeFilter === "all") return true;
      if (activeFilter === "unread") return !notification.read;
      if (activeFilter === "high") return notification.priority === "high";
      if (activeFilter === "messages") return notification.type === "message";
      if (activeFilter === "system") return notification.type === "system";
      return true;
    })
    .filter(notification => {
      // Filter by search term
      if (!searchTerm) return true;
      return (
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast.success("Toutes les notifications ont été marquées comme lues");
  };

  const handleClearAll = () => {
    clearAllNotifications();
    toast.success("Toutes les notifications ont été supprimées");
  };
  
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
                Tout marquer comme lu
              </Button>
              <Button variant="outline" size="sm" onClick={handleClearAll}>
                Tout effacer
              </Button>
            </div>
          </div>
          
          {filteredNotifications.length > 0 ? (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <div className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground">
              <BellOff className="h-12 w-12 mb-3" />
              <h3 className="text-lg font-medium">Aucune notification</h3>
              <p>Vous n'avez aucune notification correspondant à ces critères.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
