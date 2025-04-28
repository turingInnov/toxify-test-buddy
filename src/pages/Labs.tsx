
import { useState } from "react";
import { Building2, Grid, List, MapPin, Phone, Mail } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Types pour les données des laboratoires
interface Laboratory {
  id: number;
  name: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  specializations: string[];
  certifications: string[];
  available: boolean;
}

// Données fictives pour les laboratoires
const mockLaboratories: Laboratory[] = [
  {
    id: 1,
    name: "LabTech Sciences",
    location: "Paris",
    address: "123 Avenue de la Recherche, 75001 Paris",
    phone: "+33 1 23 45 67 89",
    email: "contact@labtech-sciences.fr",
    specializations: ["Toxicologie environnementale", "Analyses chimiques"],
    certifications: ["ISO 9001", "ISO 17025"],
    available: true,
  },
  {
    id: 2,
    name: "BioAnalyse",
    location: "Lyon",
    address: "45 Rue des Analyses, 69002 Lyon",
    phone: "+33 4 56 78 90 12",
    email: "info@bioanalyse.fr",
    specializations: ["Microbiologie", "Tests de toxicité"],
    certifications: ["ISO 9001"],
    available: true,
  },
  {
    id: 3,
    name: "EcoLab Research",
    location: "Marseille",
    address: "78 Boulevard Scientifique, 13008 Marseille",
    phone: "+33 4 91 23 45 67",
    email: "contact@ecolab.fr",
    specializations: ["Écotoxicologie", "Analyses environnementales"],
    certifications: ["ISO 14001", "ISO 17025"],
    available: false,
  },
  {
    id: 4,
    name: "ChimTox",
    location: "Bordeaux",
    address: "12 Allée des Chimistes, 33000 Bordeaux",
    phone: "+33 5 56 78 90 12",
    email: "info@chimtox.fr",
    specializations: ["Toxicologie chimique", "Analyse de résidus"],
    certifications: ["ISO 9001", "ISO 17025"],
    available: true,
  },
  {
    id: 5,
    name: "AgroLab",
    location: "Toulouse",
    address: "56 Avenue des Sciences, 31000 Toulouse",
    phone: "+33 5 61 23 45 67",
    email: "contact@agrolab.fr",
    specializations: ["Agrochimie", "Toxicologie alimentaire"],
    certifications: ["ISO 9001"],
    available: true,
  },
  {
    id: 6,
    name: "PharmaTox",
    location: "Lille",
    address: "34 Rue des Essais, 59000 Lille",
    phone: "+33 3 20 12 34 56",
    email: "info@pharmatox.fr",
    specializations: ["Toxicologie pharmaceutique", "Essais cliniques"],
    certifications: ["ISO 9001", "GLP"],
    available: false,
  },
];

export default function Labs() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLab, setSelectedLab] = useState<Laboratory | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filtrage des laboratoires selon la recherche
  const filteredLabs = mockLaboratories.filter((lab) =>
    lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.specializations.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Gestion de l'ouverture de la modale
  const openLabDetails = (lab: Laboratory) => {
    setSelectedLab(lab);
    setIsDialogOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Laboratoires</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="Vue en mosaïque"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              aria-label="Vue en liste"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Input
            placeholder="Rechercher un laboratoire..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredLabs.map((lab) => (
              <Card 
                key={lab.id}
                className="overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer"
                onClick={() => openLabDetails(lab)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {lab.name}
                  </CardTitle>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {lab.location}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {lab.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-50">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-1 flex justify-between items-center">
                  <div className="flex flex-wrap gap-1">
                    {lab.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                  <Badge variant={lab.available ? "default" : "destructive"}>
                    {lab.available ? "Disponible" : "Complet"}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredLabs.map((lab) => (
              <div
                key={lab.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => openLabDetails(lab)}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">{lab.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {lab.location}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden md:flex gap-1">
                    {lab.specializations.slice(0, 2).map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-50">
                        {spec}
                      </Badge>
                    ))}
                    {lab.specializations.length > 2 && (
                      <Badge variant="outline">+{lab.specializations.length - 2}</Badge>
                    )}
                  </div>
                  <Badge variant={lab.available ? "default" : "destructive"}>
                    {lab.available ? "Disponible" : "Complet"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dialogue de détails du laboratoire */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          {selectedLab && (
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  <Building2 className="h-6 w-6 text-primary" />
                  {selectedLab.name}
                </DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-4 w-4" />
                    {selectedLab.address}
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">Contact</h3>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedLab.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedLab.email}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Spécialisations</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedLab.specializations.map((spec, index) => (
                      <Badge key={index} variant="outline" className="bg-purple-50">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Certifications</h3>
                  <div className="flex flex-wrap gap-1">
                    {selectedLab.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:justify-between">
                <Badge 
                  className="text-sm py-1 px-3" 
                  variant={selectedLab.available ? "default" : "destructive"}
                >
                  {selectedLab.available ? "Laboratoire disponible" : "Laboratoire complet"}
                </Badge>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Fermer
                  </Button>
                  <Button disabled={!selectedLab.available}>
                    Contacter
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </Layout>
  );
}
