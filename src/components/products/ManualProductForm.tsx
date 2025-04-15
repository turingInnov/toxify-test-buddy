
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { CheckCheck } from "lucide-react";

// Mock data for tests
const mockTests = [
  { id: 1, name: "Test d'irritation cutanée" },
  { id: 2, name: "Test de sensibilisation cutanée" },
  { id: 3, name: "Test de biodégradabilité" },
  { id: 4, name: "Test de toxicité aquatique" },
  { id: 5, name: "Test de génotoxicité" },
  { id: 6, name: "Test de toxicité orale" },
  { id: 7, name: "Test d'émissions de composés organiques volatils" },
  { id: 8, name: "Test de toxicité par inhalation" },
];

// Categories
const categories = ["Cosmétique", "Entretien", "Alimentaire", "Matériaux", "Pharmaceutique"];

const formSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères" }),
  category: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
  imageUrl: z.string().url({ message: "Veuillez saisir une URL d'image valide" }),
  selectedTests: z.array(z.number()).min(1, { message: "Sélectionnez au moins un test" }),
});

interface ManualProductFormProps {
  onClose: () => void;
}

export function ManualProductForm({ onClose }: ManualProductFormProps) {
  const [selectedTests, setSelectedTests] = useState<number[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      selectedTests: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values);
    
    // Show a success message
    toast("Produit ajouté avec succès", {
      description: `Le produit ${values.name} a été ajouté avec ${values.selectedTests.length} tests associés.`,
      icon: <CheckCheck className="h-4 w-4" />,
    });
    
    // Close the dialog
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const toggleTest = (testId: number) => {
    setSelectedTests(prev => {
      const newSelection = prev.includes(testId)
        ? prev.filter(id => id !== testId)
        : [...prev, testId];
      
      form.setValue("selectedTests", newSelection);
      return newSelection;
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input placeholder="Entrez le nom du produit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Décrivez le produit" 
                  className="min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de l'image</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/image.jpg" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="selectedTests"
          render={() => (
            <FormItem>
              <FormLabel>Tests de toxicité</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                {mockTests.map(test => (
                  <Button
                    key={test.id}
                    type="button"
                    variant={selectedTests.includes(test.id) ? "default" : "outline"}
                    className="justify-start h-auto py-2 px-3 whitespace-normal text-left"
                    onClick={() => toggleTest(test.id)}
                  >
                    {test.name}
                  </Button>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">Enregistrer le produit</Button>
        </div>
      </form>
    </Form>
  );
}
