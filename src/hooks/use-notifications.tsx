
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/components/ui/sonner";

export type NotificationType = "message" | "system" | "alert";
export type NotificationPriority = "low" | "medium" | "high";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  date: string;
  read: boolean;
  link?: string;
}

interface NotificationsContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, "id" | "date" | "read">) => void;
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

// Mock data for notifications
const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Nouveau résultat disponible",
    message: "Les résultats du test TXL-457 sont maintenant disponibles. Consultez-les dès maintenant.",
    type: "system",
    priority: "high",
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
    link: "/tests"
  },
  {
    id: "2",
    title: "Rappel de rendez-vous",
    message: "Vous avez un test prévu demain à 14h00 au laboratoire central.",
    type: "system",
    priority: "medium",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: false
  },
  {
    id: "3",
    title: "Message du Dr. Martin",
    message: "Bonjour, pourriez-vous préciser le protocole utilisé pour l'échantillon TX-789 ? J'ai besoin de cette information pour finaliser le rapport.",
    type: "message",
    priority: "medium",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    read: true
  },
  {
    id: "4",
    title: "Mise à jour du système",
    message: "Le système sera en maintenance demain entre 2h et 4h du matin. Certaines fonctionnalités pourraient être temporairement indisponibles.",
    type: "system",
    priority: "low",
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    read: true
  },
  {
    id: "5",
    title: "Problème d'équipement détecté",
    message: "Une anomalie a été détectée sur l'équipement #E-342. Une inspection est requise dès que possible.",
    type: "alert",
    priority: "high",
    date: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(), // 16 hours ago
    read: false
  },
  {
    id: "6",
    title: "Nouvelle procédure disponible",
    message: "Une nouvelle procédure pour les tests de toxicité a été publiée. Veuillez vous familiariser avec celle-ci avant votre prochain test.",
    type: "system",
    priority: "medium",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
    read: true,
    link: "/procedures"
  },
  {
    id: "7",
    title: "Message du laboratoire Central",
    message: "Les échantillons pour le test T-567 sont prêts à être collectés. Merci de les récupérer avant 17h00.",
    type: "message",
    priority: "medium",
    date: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(), // 25 hours ago
    read: true
  },
];

export const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  // Check for new notifications when the component mounts
  useEffect(() => {
    const unreadNotifications = notifications.filter(n => !n.read);
    if (unreadNotifications.length > 0) {
      toast(`Vous avez ${unreadNotifications.length} notification${
        unreadNotifications.length > 1 ? 's' : ''
      } non lue${unreadNotifications.length > 1 ? 's' : ''}`);
    }
  }, []);

  const addNotification = (notification: Omit<Notification, "id" | "date" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show a toast for high priority notifications
    if (notification.priority === "high") {
      toast.warning(notification.title, {
        description: notification.message,
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: false } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider value={{
      notifications,
      addNotification,
      markAsRead,
      markAsUnread,
      markAllAsRead,
      removeNotification,
      clearAllNotifications,
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};
