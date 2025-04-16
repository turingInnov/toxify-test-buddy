
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TestSubscriptionDialog } from "./TestSubscriptionDialog";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Beaker, Calendar as CalendarIcon, Info } from "lucide-react";

// Mock data for scheduled tests
const mockScheduledTests = [
  {
    id: 1,
    productId: 1,
    productName: "Cosmétique Alpha-X",
    testName: "Test d'irritation cutanée",
    date: new Date(2025, 4, 5), // May 5, 2025
    initialCost: 1500,
    currentCost: 1500,
    maxSubscribers: 5,
    currentSubscribers: 1,
  },
  {
    id: 2, 
    productId: 2,
    productName: "Nettoyant Éco-Plus",
    testName: "Test de biodégradabilité",
    date: new Date(2025, 4, 12), // May 12, 2025
    initialCost: 2000,
    currentCost: 1000,
    maxSubscribers: 4,
    currentSubscribers: 2,
  },
  {
    id: 3,
    productId: 3,
    productName: "Supplément BioVital",
    testName: "Test de génotoxicité",
    date: new Date(2025, 4, 18), // May 18, 2025
    initialCost: 3000,
    currentCost: 1000,
    maxSubscribers: 6,
    currentSubscribers: 3,
  },
  {
    id: 4,
    productId: 4,
    productName: "Peinture NatureTone",
    testName: "Test d'émissions de COV",
    date: new Date(2025, 4, 25), // May 25, 2025
    initialCost: 2500,
    currentCost: 625,
    maxSubscribers: 8,
    currentSubscribers: 4,
  }
];

export function TestSchedulingCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false);

  // Find tests scheduled for the selected date
  const testsForSelectedDate = selectedDate
    ? mockScheduledTests.filter(
        (test) => test.date.toDateString() === selectedDate.toDateString()
      )
    : [];

  // Function to handle test selection
  const handleTestSelect = (test: any) => {
    setSelectedTest(test);
    setIsSubscriptionDialogOpen(true);
  };

  // Function to get dates with scheduled tests for highlighting in calendar
  const getTestDates = () => {
    return mockScheduledTests.map(test => test.date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-1">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md border"
          modifiers={{
            booked: getTestDates(),
          }}
          modifiersClassNames={{
            booked: "border-2 border-primary rounded-full font-bold text-primary",
          }}
        />
      </div>

      <div className="md:col-span-1 space-y-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <h3 className="text-lg font-medium">
            {selectedDate
              ? `Tests du ${format(selectedDate, "d MMMM yyyy", { locale: fr })}`
              : "Sélectionnez une date"}
          </h3>
        </div>

        {testsForSelectedDate.length > 0 ? (
          <div className="space-y-3">
            {testsForSelectedDate.map((test) => (
              <Card 
                key={test.id} 
                className={cn(
                  "overflow-hidden transition-all hover:shadow-md cursor-pointer",
                  test.currentSubscribers >= test.maxSubscribers ? "opacity-70" : ""
                )}
                onClick={() => handleTestSelect(test)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{test.testName}</h4>
                      <p className="text-sm text-muted-foreground">Produit: {test.productName}</p>
                    </div>
                    <Beaker className="h-5 w-5 text-primary" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Coût actuel:</p>
                      <p className="font-medium">{test.currentCost} €</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Participants:</p>
                      <p className="font-medium">
                        {test.currentSubscribers} / {test.maxSubscribers}
                        {test.currentSubscribers >= test.maxSubscribers && 
                          <span className="ml-2 text-red-500 text-xs">(Complet)</span>
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-muted-foreground">
            <Info className="h-12 w-12 mb-2 opacity-40" />
            <p>Aucun test planifié pour cette date</p>
            <Button variant="outline" className="mt-4">
              Créer un nouveau test
            </Button>
          </div>
        )}
      </div>

      {selectedTest && (
        <TestSubscriptionDialog
          test={selectedTest}
          open={isSubscriptionDialogOpen}
          onOpenChange={setIsSubscriptionDialogOpen}
        />
      )}
    </div>
  );
}
