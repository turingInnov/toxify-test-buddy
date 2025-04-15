
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, FileUp, Keyboard, ArrowLeft } from "lucide-react";
import { ManualProductForm } from "./ManualProductForm";
import { ImageUploadForm } from "./ImageUploadForm";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type AddMethod = "manual" | "upload" | null;

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const [addMethod, setAddMethod] = useState<AddMethod>(null);

  // Reset the state when the dialog is closed
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Small delay to prevent visual issues during the closing animation
      setTimeout(() => {
        setAddMethod(null);
      }, 200);
    }
    onOpenChange(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {addMethod ? (
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="mr-2 h-8 w-8" 
                  onClick={() => setAddMethod(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                {addMethod === "manual" ? "Ajouter un produit manuellement" : "Ajouter par image"}
              </div>
            ) : (
              "Ajouter un nouveau produit"
            )}
          </DialogTitle>
        </DialogHeader>

        {!addMethod ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <Card 
              className="p-6 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer hover:bg-secondary/50 transition-colors duration-200"
              onClick={() => setAddMethod("manual")}
            >
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Keyboard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Saisie manuelle</h3>
                <p className="text-sm text-muted-foreground">Entrez les informations du produit manuellement</p>
              </div>
            </Card>

            <Card 
              className="p-6 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer hover:bg-secondary/50 transition-colors duration-200"
              onClick={() => setAddMethod("upload")}
            >
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Image et IA</h3>
                <p className="text-sm text-muted-foreground">Scanner ou uploader une image pour l'analyse par IA</p>
              </div>
            </Card>
          </div>
        ) : (
          <div className="py-4">
            {addMethod === "manual" ? (
              <ManualProductForm onClose={() => handleOpenChange(false)} />
            ) : (
              <ImageUploadForm onClose={() => handleOpenChange(false)} />
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
