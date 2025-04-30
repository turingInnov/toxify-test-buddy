
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger
} from "@/components/ui/context-menu";
import { 
  AlertTriangle, 
  Bell, 
  Check, 
  MessageCircle, 
  MoreVertical, 
  Trash, 
  Eye, 
  Mail 
} from "lucide-react";
import { Notification, useNotifications } from "@/hooks/use-notifications";

interface NotificationItemProps {
  notification: Notification;
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const { markAsRead, markAsUnread, removeNotification } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const getIcon = () => {
    switch (notification.type) {
      case "message":
        return <MessageCircle className="h-5 w-5" />;
      case "system":
        return <Mail className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  const getIconColor = () => {
    if (!notification.read) return "text-primary";
    if (notification.priority === "high") return "text-destructive";
    return "text-muted-foreground";
  };

  const getBadge = () => {
    if (notification.priority === "high") {
      return <Badge variant="destructive">Urgent</Badge>;
    }
    if (!notification.read) {
      return <Badge variant="secondary">Nouveau</Badge>;
    }
    return null;
  };

  const toggleRead = () => {
    if (notification.read) {
      markAsUnread(notification.id);
    } else {
      markAsRead(notification.id);
    }
  };

  const handleDelete = () => {
    removeNotification(notification.id);
    setShowDeleteDialog(false);
  };

  const timeAgo = formatDistanceToNow(new Date(notification.date), {
    addSuffix: true,
    locale: fr
  });

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={`flex items-start p-4 rounded-md border gap-4 cursor-pointer transition-colors ${
              !notification.read
                ? "bg-primary/5 border-primary/20"
                : "bg-background hover:bg-muted/30"
            }`}
            onClick={() => {
              if (!notification.read) markAsRead(notification.id);
              setIsOpen(true);
            }}
          >
            <div className={`mt-0.5 ${getIconColor()}`}>{getIcon()}</div>
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium">{notification.title}</div>
                <div className="flex items-center gap-2">
                  {notification.priority === "high" && (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {timeAgo}
                  </span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {notification.message}
              </p>
              <div className="flex items-center justify-between pt-1">
                <div>{getBadge()}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteDialog(true);
                  }}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={toggleRead}>
            {notification.read ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                <span>Marquer comme non lu</span>
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                <span>Marquer comme lu</span>
              </>
            )}
          </ContextMenuItem>
          <ContextMenuItem onClick={() => setShowDeleteDialog(true)}>
            <Trash className="h-4 w-4 mr-2" />
            <span>Supprimer</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette notification ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Cela supprimera définitivement cette notification.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {notification.priority === "high" && (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              )}
              {notification.title}
            </AlertDialogTitle>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-xs">
                {notification.type === "message" ? "Message" : "Système"}
              </Badge>
              <span className="text-xs text-muted-foreground">{timeAgo}</span>
            </div>
          </AlertDialogHeader>
          <p className="text-sm">{notification.message}</p>
          {notification.link && (
            <a 
              href={notification.link} 
              className="text-sm text-primary hover:underline"
            >
              En savoir plus
            </a>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel>Fermer</AlertDialogCancel>
            {!notification.read && (
              <AlertDialogAction onClick={() => markAsRead(notification.id)}>
                Marquer comme lu
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
