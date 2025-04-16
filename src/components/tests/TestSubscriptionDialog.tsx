
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertTriangle, CheckCircle, Users } from "lucide-react";

interface TestSubscriptionDialogProps {
  test: {
    id: number;
    productId: number;
    productName: string;
    testName: string;
    date: Date;
    initialCost: number;
    currentCost: number;
    maxSubscribers: number;
    currentSubscribers: number;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TestSubscriptionDialog({
  test,
  open,
  onOpenChange,
}: TestSubscriptionDialogProps) {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const isFull = test.currentSubscribers >= test.maxSubscribers;
  
  // Function to simulate subscribing to a test
  const handleSubscribe = () => {
    setIsSubscribing(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (isFull) {
        // Redirect to alternative sessions (handled in the UI for now)
        toast.error("Ce test est complet. Recherche d'alternatives...");
      } else {
        // Calculate new cost per participant
        const newSubscribersCount = test.currentSubscribers + 1;
        const newCost = Math.round(test.initialCost / newSubscribersCount);
        
        toast.success("Souscription réussie !");
        toast.info(
          `Le nouveau coût par participant est de ${newCost}€ (${test.currentCost}€ → ${newCost}€)`, 
          { duration: 5000 }
        );
      }
      
      setIsSubscribing(false);
      onOpenChange(false);
    }, 1500);
  };
  
  // Function to find alternative sessions
  const handleFindAlternatives = () => {
    onOpenChange(false);
    toast.info("Recherche de sessions alternatives...");
    
    // Simulate finding alternatives
    setTimeout(() => {
      toast.success("Nouvelles sessions disponibles !");
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Souscrire au test</DialogTitle>
          <DialogDescription>
            Détails du test de toxicité et informations de souscription
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium text-lg">{test.testName}</h3>
            <p className="text-sm text-muted-foreground">Produit: {test.productName}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Date</p>
              <p>{test.date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Coût initial</p>
              <p>{test.initialCost} €</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Coût actuel par participant</p>
              <p className="font-medium">{test.currentCost} €</p>
            </div>
            
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Participants</p>
              <div className="flex items-center">
                <p>{test.currentSubscribers} / {test.maxSubscribers}</p>
                <Users className="h-4 w-4 ml-1 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          {/* Status message */}
          {isFull ? (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 rounded-md text-sm">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <p>Ce test a atteint sa capacité maximale de participants.</p>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-md text-sm">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <p>Des places sont disponibles pour ce test. Le coût sera divisé entre tous les participants.</p>
            </div>
          )}
          
          {isFull && (
            <div className="bg-secondary p-3 rounded-md text-sm">
              <p className="font-medium mb-2">Vous pouvez :</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Rechercher d'autres sessions pour ce type de test</li>
                <li>Créer une nouvelle session</li>
              </ul>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          
          {isFull ? (
            <Button onClick={handleFindAlternatives}>
              Rechercher des alternatives
            </Button>
          ) : (
            <Button onClick={handleSubscribe} disabled={isSubscribing}>
              {isSubscribing ? "Souscription en cours..." : "Souscrire"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
