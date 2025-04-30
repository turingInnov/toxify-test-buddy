
import { Beaker, Home, BellRing, TestTubes, Building2, CalendarDays } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/use-notifications";

export function AppSidebar() {
  const location = useLocation();
  const { notifications } = useNotifications();
  
  // Calculate unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;
  
  const menuItems = [
    { title: "Tableau de bord", icon: Home, url: "/" },
    { title: "Produits", icon: Beaker, url: "/products" },
    { title: "Tests", icon: TestTubes, url: "/tests" },
    { title: "Laboratoires", icon: Building2, url: "/labs" },
    { title: "Planning", icon: CalendarDays, url: "/test-calendar" },
    { 
      title: "Notifications", 
      icon: BellRing, 
      url: "/notifications",
      badge: unreadCount > 0 ? unreadCount : undefined
    },
  ];
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-primary text-primary-foreground text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
