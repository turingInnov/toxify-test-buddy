
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Grid2X2, List, Users, Calendar, Beaker, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Données mock des tests souscrits par l'utilisateur
const mockSubscribedTests = [
  {
    id: 1,
    productName: "Cosmétique Alpha-X",
    testName: "Test d'irritation cutanée",
    date: new Date(2025, 4, 5),
    description: "Ce test évalue le potentiel d'irritation cutanée du produit en utilisant des modèles de peau reconstitués conformes aux normes ISO 10993.",
    initialCost: 1500,
    currentCost: 500,
    subscribedUsers: 3,
    maxSubscribers: 5,
    status: "En cours"
  },
  {
    id: 2,
    productName: "Nettoyant Éco-Plus",
    testName: "Test de biodégradabilité",
    date: new Date(2025, 4, 12),
    description: "Évaluation de la capacité du produit à se décomposer naturellement dans l'environnement selon les directives OCDE 301.",
    initialCost: 2000,
    currentCost: 667,
    subscribedUsers: 3,
    maxSubscribers: 4,
    status: "Planifié"
  },
  {
    id: 3,
    productName: "Supplément BioVital",
    testName: "Test de génotoxicité",
    date: new Date(2025, 4, 18),
    description: "Détection des substances qui peuvent endommager l'ADN en utilisant le test d'Ames et l'essai des micronoyaux in vitro.",
    initialCost: 3000,
    currentCost: 1000,
    subscribedUsers: 3,
    maxSubscribers: 6,
    status: "Validé"
  },
];

// Données mock des tests disponibles auxquels l'utilisateur n'a pas encore souscrit
const mockAvailableTests = [
  {
    id: 101,
    productName: "Lotion SkinCare+",
    testName: "Test de sensibilisation cutanée",
    date: new Date(2025, 5, 10),
    description: "Ce test évalue le potentiel de sensibilisation cutanée du produit en utilisant le test maximisé d'induction au niveau des ganglions lymphatiques locaux (LLNA).",
    initialCost: 2200,
    currentCost: 550,
    subscribedUsers: 3,
    maxSubscribers: 6,
    status: "Planifié"
  },
  {
    id: 102,
    productName: "Détergent MicroBio",
    testName: "Test de toxicité aquatique",
    date: new Date(2025, 5, 15),
    description: "Évaluation de l'impact écotoxicologique du produit sur les organismes aquatiques selon les méthodes OCDE 201, 202 et 203.",
    initialCost: 3500,
    currentCost: 1167,
    subscribedUsers: 2,
    maxSubscribers: 5,
    status: "En cours"
  },
  {
    id: 103,
    productName: "Sérum VieDurable",
    testName: "Test de phototoxicité",
    date: new Date(2025, 5, 22),
    description: "Évaluation du potentiel de phototoxicité du produit selon la méthode de test in vitro 3T3 NRU décrite dans la directive OCDE 432.",
    initialCost: 1800,
    currentCost: 900,
    subscribedUsers: 1,
    maxSubscribers: 3,
    status: "Planifié"
  },
];

export default function Tests() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTest, setSelectedTest] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // État pour les recherches
  const [subscribedSearchTerm, setSubscribedSearchTerm] = useState("");
  const [availableSearchTerm, setAvailableSearchTerm] = useState("");

  // Filtrage des tests souscrits
  const filteredSubscribedTests = mockSubscribedTests.filter(test => 
    test.productName.toLowerCase().includes(subscribedSearchTerm.toLowerCase()) ||
    test.testName.toLowerCase().includes(subscribedSearchTerm.toLowerCase())
  );

  // Filtrage des tests disponibles
  const filteredAvailableTests = mockAvailableTests.filter(test => 
    test.productName.toLowerCase().includes(availableSearchTerm.toLowerCase()) ||
    test.testName.toLowerCase().includes(availableSearchTerm.toLowerCase())
  );

  const handleTestClick = (test: any) => {
    setSelectedTest(test);
    setIsModalOpen(true);
  };

  // Calcul du coût probable si un nouvel utilisateur souscrit
  const calculateProbableCost = (test: any) => {
    if (test.subscribedUsers >= test.maxSubscribers) {
      return null; // Test complet
    }
    return Math.round(test.initialCost / (test.subscribedUsers + 1));
  };

  // Rendu d'une carte de test pour la vue en mosaïque
  const renderTestCard = (test: any, isSubscribed: boolean = true) => (
    <Card 
      key={test.id} 
      className="hover:shadow-md transition-all duration-200 hover:bg-accent/10 cursor-pointer"
      onClick={() => handleTestClick(test)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{test.testName}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm mb-2 truncate">{test.productName}</p>
        <div className="flex items-center gap-1 text-sm mb-1">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>{format(test.date, 'dd MMMM yyyy', { locale: fr })}</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>{test.subscribedUsers}/{test.maxSubscribers} participants</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Badge variant={
          test.status === "En cours" ? "default" : 
          test.status === "Planifié" ? "secondary" : 
          "outline"
        }>
          {test.status}
        </Badge>
        <div className="flex flex-col items-end">
          <span className="font-medium">{test.currentCost} €</span>
          {!isSubscribed && (
            <span className="text-xs text-muted-foreground">
              {test.subscribedUsers < test.maxSubscribers ? "Disponible" : "Complet"}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Section des tests souscrits */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Mes Tests</h1>
          <p className="text-muted-foreground">
            Tests de toxicité auxquels vous avez souscrit
          </p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {filteredSubscribedTests.length} tests souscrits
            </p>
            {/* Ajout d'un champ de recherche */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher dans mes tests..."
                className="pl-10"
                value={subscribedSearchTerm}
                onChange={(e) => setSubscribedSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-1 p-1 bg-muted rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
              className="h-8 w-8"
            >
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className="h-8 w-8"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Affichage des tests souscrits */}
        {filteredSubscribedTests.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSubscribedTests.map(test => renderTestCard(test))}
            </div>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Coût actuel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribedTests.map(test => (
                    <TableRow 
                      key={test.id} 
                      className="cursor-pointer hover:bg-accent/10"
                      onClick={() => handleTestClick(test)}
                    >
                      <TableCell className="font-medium">{test.testName}</TableCell>
                      <TableCell>{test.productName}</TableCell>
                      <TableCell>{format(test.date, 'dd/MM/yyyy', { locale: fr })}</TableCell>
                      <TableCell>{test.subscribedUsers}/{test.maxSubscribers}</TableCell>
                      <TableCell>
                        <Badge variant={
                          test.status === "En cours" ? "default" : 
                          test.status === "Planifié" ? "secondary" : 
                          "outline"
                        }>
                          {test.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{test.currentCost} €</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )
        ) : (
          <Card className="py-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <Beaker className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
              <p className="text-muted-foreground">Aucun test souscrit ne correspond à votre recherche.</p>
            </CardContent>
          </Card>
        )}

        {/* Section des tests disponibles */}
        <div className="pt-4">
          <h2 className="text-xl font-semibold mb-2">Tests disponibles</h2>
          <p className="text-muted-foreground">
            Tests de toxicité auxquels vous pouvez souscrire
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {filteredAvailableTests.length} tests disponibles
            </p>
            {/* Champ de recherche pour les tests disponibles */}
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Rechercher dans les tests disponibles..."
                className="pl-10"
                value={availableSearchTerm}
                onChange={(e) => setAvailableSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Affichage des tests disponibles */}
        {filteredAvailableTests.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAvailableTests.map(test => renderTestCard(test, false))}
            </div>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead>Produit</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Coût actuel</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAvailableTests.map(test => (
                    <TableRow 
                      key={test.id} 
                      className="cursor-pointer hover:bg-accent/10"
                      onClick={() => handleTestClick(test)}
                    >
                      <TableCell className="font-medium">{test.testName}</TableCell>
                      <TableCell>{test.productName}</TableCell>
                      <TableCell>{format(test.date, 'dd/MM/yyyy', { locale: fr })}</TableCell>
                      <TableCell>{test.subscribedUsers}/{test.maxSubscribers}</TableCell>
                      <TableCell>
                        <Badge variant={
                          test.status === "En cours" ? "default" : 
                          test.status === "Planifié" ? "secondary" : 
                          "outline"
                        }>
                          {test.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{test.currentCost} €</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )
        ) : (
          <Card className="py-8">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <Beaker className="h-12 w-12 text-muted-foreground mb-2 opacity-50" />
              <p className="text-muted-foreground">Aucun test disponible ne correspond à votre recherche.</p>
            </CardContent>
          </Card>
        )}

        {/* Modal de détail du test */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          {selectedTest && (
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedTest.testName}</DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedTest.productName}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-2">
                <div>
                  <h3 className="text-md font-medium mb-1">Description du test</h3>
                  <p className="text-sm text-muted-foreground">{selectedTest.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-muted-foreground">Date</h4>
                    <p>{format(selectedTest.date, 'dd MMMM yyyy', { locale: fr })}</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-medium text-muted-foreground">Statut</h4>
                    <Badge variant={
                      selectedTest.status === "En cours" ? "default" : 
                      selectedTest.status === "Planifié" ? "secondary" : 
                      "outline"
                    }>
                      {selectedTest.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-xs font-medium text-muted-foreground">Participants</h4>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {selectedTest.subscribedUsers} utilisateurs ont souscrit à ce test
                      {selectedTest.subscribedUsers >= selectedTest.maxSubscribers && 
                        " (Complet)"}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <h4 className="text-xs font-medium text-muted-foreground">Coût actuel</h4>
                      <p className="text-lg font-medium">{selectedTest.currentCost} €</p>
                    </div>
                    
                    {calculateProbableCost(selectedTest) !== null && (
                      <div className="space-y-1">
                        <h4 className="text-xs font-medium text-muted-foreground">Coût probable si +1 souscription</h4>
                        <p className="text-md">{calculateProbableCost(selectedTest)} €</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Fermer
                </Button>
                {/* Afficher un bouton différent selon que l'utilisateur est abonné ou non */}
                {mockSubscribedTests.some(t => t.id === selectedTest.id) ? (
                  <Button variant="outline" className="text-destructive hover:text-destructive">
                    Se désabonner
                  </Button>
                ) : (
                  <Button 
                    disabled={selectedTest.subscribedUsers >= selectedTest.maxSubscribers}
                  >
                    {selectedTest.subscribedUsers >= selectedTest.maxSubscribers ? "Complet" : "S'abonner"}
                  </Button>
                )}
              </div>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </Layout>
  );
}
