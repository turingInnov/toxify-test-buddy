
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ProductCard } from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock data for the products
const mockProducts = [
  {
    id: 1,
    name: "Cosmétique Alpha-X",
    description: "Crème pour le visage avec acides alpha-hydroxylés",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    category: "Cosmétique",
    dateAdded: "2025-03-10",
    tests: [
      { id: 1, name: "Test d'irritation cutanée" },
      { id: 2, name: "Test de sensibilisation cutanée" },
    ]
  },
  {
    id: 2,
    name: "Nettoyant Éco-Plus",
    description: "Produit nettoyant écologique multi-surfaces",
    imageUrl: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    category: "Entretien",
    dateAdded: "2025-03-15",
    tests: [
      { id: 3, name: "Test de biodégradabilité" },
      { id: 4, name: "Test de toxicité aquatique" },
    ]
  },
  {
    id: 3,
    name: "Supplément BioVital",
    description: "Complément alimentaire à base de plantes",
    imageUrl: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "Alimentaire",
    dateAdded: "2025-03-18",
    tests: [
      { id: 5, name: "Test de génotoxicité" },
      { id: 6, name: "Test de toxicité orale" },
    ]
  },
  {
    id: 4,
    name: "Peinture NatureTone",
    description: "Peinture à base d'eau sans COV",
    imageUrl: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    category: "Matériaux",
    dateAdded: "2025-03-20",
    tests: [
      { id: 7, name: "Test d'émissions de composés organiques volatils" },
      { id: 8, name: "Test de toxicité par inhalation" },
    ]
  },
];

export function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("tous");

  // Get unique categories for tabs
  const categories = ["tous", ...new Set(mockProducts.map(product => product.category.toLowerCase()))];

  // Filter products based on search term and active tab
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "tous" || product.category.toLowerCase() === activeTab;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Tabs defaultValue="tous" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Rechercher un produit..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <Card className="p-6 text-center text-muted-foreground">
          Aucun produit ne correspond à votre recherche.
        </Card>
      )}
    </div>
  );
}
