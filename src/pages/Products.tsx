
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { ProductList } from "@/components/products/ProductList";
import { AddProductDialog } from "@/components/products/AddProductDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Products() {
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold mb-2">Produits</h1>
            <p className="text-muted-foreground">
              Gérez vos produits et leurs tests de toxicité associés
            </p>
          </div>
          <Button onClick={() => setAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Ajouter un produit
          </Button>
        </div>

        <ProductList />
        
        <AddProductDialog 
          open={addDialogOpen} 
          onOpenChange={setAddDialogOpen} 
        />
      </div>
    </Layout>
  );
}
