
import { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Beaker, CalendarDays } from "lucide-react";
import { TestSubscriptionDialog } from "./TestSubscriptionDialog";

// Mock data for scheduled tests (same as in TestSchedulingCalendar)
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

export function TestsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [isSubscriptionDialogOpen, setIsSubscriptionDialogOpen] = useState(false);

  // Filter tests based on search term
  const filteredTests = mockScheduledTests.filter(test => 
    test.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.testName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubscribe = (test: any) => {
    setSelectedTest(test);
    setIsSubscriptionDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Liste des tests planifiés</h3>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un test..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {filteredTests.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Type de test</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Coût actuel</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTests.map(test => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.productName}</TableCell>
                  <TableCell>{test.testName}</TableCell>
                  <TableCell>{format(test.date, 'dd MMMM yyyy', { locale: fr })}</TableCell>
                  <TableCell>{test.currentCost} €</TableCell>
                  <TableCell>
                    {test.currentSubscribers} / {test.maxSubscribers}
                    {test.currentSubscribers >= test.maxSubscribers && 
                      <span className="ml-2 text-red-500 text-xs">(Complet)</span>
                    }
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      size="sm" 
                      variant={test.currentSubscribers >= test.maxSubscribers ? "outline" : "default"}
                      disabled={test.currentSubscribers >= test.maxSubscribers}
                      onClick={() => handleSubscribe(test)}
                    >
                      {test.currentSubscribers >= test.maxSubscribers ? "Complet" : "Souscrire"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Card className="p-6 text-center text-muted-foreground">
          <div className="flex flex-col items-center justify-center">
            <CalendarDays className="h-12 w-12 mb-2 opacity-40" />
            <p>Aucun test ne correspond à votre recherche.</p>
          </div>
        </Card>
      )}

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
