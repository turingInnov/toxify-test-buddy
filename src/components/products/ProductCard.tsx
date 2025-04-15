
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Beaker, Calendar, Info } from "lucide-react";
import { ProductDetails } from "./ProductDetails";

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  dateAdded: string;
  tests: { id: number; name: string }[];
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  
  // Format the date
  const formattedDate = new Date(product.dateAdded).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <Card 
      className="overflow-hidden transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer group"
    >
      <div className="relative">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="capitalize">
            {product.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm">{product.description}</p>
                <div className="border-t pt-2 mt-2">
                  <p className="text-sm font-medium mb-1">Tests de toxicité associés:</p>
                  <ul className="text-sm space-y-1">
                    {product.tests.map(test => (
                      <li key={test.id} className="flex items-center gap-2">
                        <Beaker className="h-3 w-3 text-primary" />
                        {test.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            <span>Ajouté le {formattedDate}</span>
          </div>
          
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button size="sm" variant="outline">Détails</Button>
            </PopoverTrigger>
            <PopoverContent className="w-96">
              <ProductDetails product={product} onClose={() => setIsPopoverOpen(false)} />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
}
