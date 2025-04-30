
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useNotifications } from "@/hooks/use-notifications";

export function NotificationSummary() {
  const { notifications } = useNotifications();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === "high" && !n.read).length;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm">Total</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{notifications.length}</span>
              <Badge variant="outline" className="text-muted-foreground">Notifications</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm">Non lues</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{unreadCount}</span>
              <Badge variant="secondary" className="text-secondary-foreground">Nouvelles</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-sm">Urgentes</span>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{urgentCount}</span>
              <Badge variant="destructive">Attention</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
