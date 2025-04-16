
import { Button } from "@/components/ui/button";
import { Beaker, Calendar, Tag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  dateAdded: string;
  tests: { id: number; name: string }[];
}

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetails({ product, onClose }: ProductDetailsProps) {
  const navigate = useNavigate();
  
  // Format the date
  const formattedDate = new Date(product.dateAdded).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Function to handle navigation to test calendar
  const handleScheduleTest = () => {
    onClose();
    navigate("/test-calendar");
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="aspect-video overflow-hidden rounded-md">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-2">
        <p>{product.description}</p>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Tag className="h-4 w-4" />
          <span>Catégorie: <span className="capitalize">{product.category}</span></span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Ajouté le {formattedDate}</span>
        </div>
      </div>
      
      <div className="border-t pt-3">
        <h4 className="font-medium mb-2">Tests de toxicité associés:</h4>
        <ul className="space-y-2">
          {product.tests.map(test => (
            <li key={test.id} className="flex items-center gap-2 bg-secondary/50 rounded-md p-2">
              <Beaker className="h-4 w-4 text-primary" />
              <span>{test.name}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" onClick={onClose}>Fermer</Button>
        <Button variant="secondary" onClick={handleScheduleTest}>
          <Calendar className="h-4 w-4 mr-2" />
          Planifier un test
        </Button>
        <Button>Modifier</Button>
      </div>
    </div>
  );
}
