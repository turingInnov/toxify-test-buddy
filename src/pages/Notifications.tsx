
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { NotificationList } from "@/components/notifications/NotificationList";
import { NotificationFilters } from "@/components/notifications/NotificationFilters";
import { NotificationSummary } from "@/components/notifications/NotificationSummary";

export default function Notifications() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Gérez vos notifications et restez informé des mises à jour importantes
          </p>
        </div>
        
        <NotificationSummary />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <NotificationFilters 
              activeFilter={activeFilter} 
              setActiveFilter={setActiveFilter} 
            />
          </div>
          
          <div className="md:col-span-3">
            <NotificationList activeFilter={activeFilter} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
