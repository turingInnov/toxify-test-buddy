
import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { TestSchedulingCalendar } from "@/components/tests/TestSchedulingCalendar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TestsList } from "@/components/tests/TestsList";

export default function TestCalendar() {
  const [activeView, setActiveView] = useState<"calendar" | "list">("calendar");

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold mb-2">Calendrier des Tests</h1>
          <p className="text-muted-foreground">
            Planifiez et souscrivez aux tests de toxicité pour vos produits
          </p>
        </div>

        <Card className="p-6">
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "calendar" | "list")}>
            <TabsList className="mb-4">
              <TabsTrigger value="calendar">Vue Calendrier</TabsTrigger>
              <TabsTrigger value="list">Vue Liste</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar">
              <TestSchedulingCalendar />
            </TabsContent>
            <TabsContent value="list">
              <TestsList />
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
}
