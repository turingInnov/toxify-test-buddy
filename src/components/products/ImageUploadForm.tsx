
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileUp, Camera, Loader2, CheckCircle2, X, AlertCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadFormProps {
  onClose: () => void;
}

export function ImageUploadForm({ onClose }: ImageUploadFormProps) {
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [askingQuestions, setAskingQuestions] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [extractedData, setExtractedData] = useState({
    name: "",
    description: "",
    category: "",
    ingredients: "",
    suggestedTests: [] as { id: number; name: string; confidence: number }[],
  });

  // Mock tests data
  const availableTests = [
    { id: 1, name: "Test d'irritation cutanée" },
    { id: 2, name: "Test de sensibilisation cutanée" },
    { id: 3, name: "Test de biodégradabilité" },
    { id: 4, name: "Test de toxicité aquatique" },
    { id: 5, name: "Test de génotoxicité" },
    { id: 6, name: "Test de toxicité orale" },
    { id: 7, name: "Test d'émissions de composés organiques volatils" },
    { id: 8, name: "Test de toxicité par inhalation" },
  ];

  // AI follow-up questions when information is insufficient
  const aiQuestions = [
    {
      id: 1,
      question: "Est-ce que le produit contient des conservateurs ou des parabènes?",
      options: ["Oui", "Non", "Je ne sais pas"],
      impact: "toxicité cutanée"
    },
    {
      id: 2,
      question: "Le produit est-il destiné à être utilisé sur la peau?",
      options: ["Oui", "Non"],
      impact: "tests cutanés"
    },
    {
      id: 3,
      question: "Le produit contient-il des substances volatiles?",
      options: ["Oui", "Non", "Je ne sais pas"],
      impact: "tests respiratoires"
    }
  ];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      
      // Create URL for preview
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // Reset analysis states
      setIsAnalyzing(false);
      setAnalysisComplete(false);
      setAskingQuestions(false);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCameraCapture = () => {
    // In a real implementation, this would access the device camera
    // For now, we'll just trigger the file input as a simulation
    triggerFileInput();
  };

  const simulateOCRandAIAnalysis = () => {
    if (!selectedFile) {
      toast.error("Veuillez d'abord sélectionner une image");
      return;
    }

    setIsAnalyzing(true);

    // Simulate OCR and AI analysis with a delay
    setTimeout(() => {
      // Mock extracted data from OCR and AI analysis
      const mockAnalysisResults = {
        name: selectedFile.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        description: "Ce produit semble être un [type de produit] destiné à [usage]. L'image suggère des propriétés [caractéristiques].",
        category: "Cosmétique", // Default category
        ingredients: "Eau, glycérine, extraits botaniques, conservateurs",
        suggestedTests: [
          { id: 1, name: "Test d'irritation cutanée", confidence: 0.85 },
          { id: 2, name: "Test de sensibilisation cutanée", confidence: 0.78 },
          { id: 5, name: "Test de génotoxicité", confidence: 0.65 },
        ]
      };
      
      setExtractedData(mockAnalysisResults);
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      
      // Randomly decide if we need to ask follow-up questions
      const needsQuestions = Math.random() > 0.5;
      if (needsQuestions) {
        setTimeout(() => {
          setAskingQuestions(true);
        }, 500);
      }
    }, 2000);
  };

  const handleAnswerQuestion = (answer: string) => {
    console.log(`Question ${aiQuestions[currentQuestionIndex].id} answered: ${answer}`);
    
    // If this is the last question, finish the questioning phase
    if (currentQuestionIndex >= aiQuestions.length - 1) {
      setAskingQuestions(false);
      
      // Update suggested tests based on answers
      // In a real app, this would be more sophisticated
      const updatedTests = [
        ...extractedData.suggestedTests,
        { 
          id: 7, 
          name: "Test d'émissions de composés organiques volatils", 
          confidence: 0.72 
        }
      ];
      
      setExtractedData(prev => ({
        ...prev,
        suggestedTests: updatedTests
      }));
      
      toast.success("Analyse complétée avec vos réponses", {
        description: "Les tests recommandés ont été mis à jour.",
      });
    } else {
      // Move to the next question
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleSaveProduct = () => {
    // In a real application, this would save the product to a database
    console.log("Saving product:", extractedData);
    
    toast.success("Produit ajouté avec succès", {
      description: `Le produit ${extractedData.name} a été ajouté avec ${extractedData.suggestedTests.length} tests associés.`,
    });
    
    // Close the dialog
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const resetUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setIsAnalyzing(false);
    setAnalysisComplete(false);
    setAskingQuestions(false);
    setCurrentQuestionIndex(0);
    setExtractedData({
      name: "",
      description: "",
      category: "",
      ingredients: "",
      suggestedTests: [],
    });
  };

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">
            <FileUp className="w-4 h-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="camera">
            <Camera className="w-4 h-4 mr-2" />
            Caméra
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="pt-4">
          <div className="flex flex-col items-center justify-center">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            
            {!previewUrl ? (
              <Card 
                className="border-dashed border-2 p-8 w-full text-center cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={triggerFileInput}
              >
                <div className="flex flex-col items-center space-y-4">
                  <FileUp className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Cliquez pour sélectionner une image</p>
                    <p className="text-sm text-muted-foreground">ou glissez-déposez un fichier ici</p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="w-full space-y-4">
                <div className="relative mx-auto max-w-sm">
                  <img 
                    src={previewUrl} 
                    alt="Aperçu du produit" 
                    className="w-full h-auto max-h-[300px] object-contain rounded-md border"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={resetUpload}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {!isAnalyzing && !analysisComplete && (
                  <Button 
                    className="w-full" 
                    onClick={simulateOCRandAIAnalysis}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyser avec l'IA
                  </Button>
                )}
                
                {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-center">Analyse en cours...</p>
                    <p className="text-xs text-muted-foreground text-center">
                      Extraction du texte et identification des composants...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="camera" className="pt-4">
          <div className="flex flex-col items-center justify-center">
            {!previewUrl ? (
              <Card 
                className="border-dashed border-2 p-8 w-full text-center cursor-pointer hover:bg-secondary/20 transition-colors"
                onClick={handleCameraCapture}
              >
                <div className="flex flex-col items-center space-y-4">
                  <Camera className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Cliquez pour prendre une photo</p>
                    <p className="text-sm text-muted-foreground">Utilisez la caméra de votre appareil</p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="w-full space-y-4">
                <div className="relative mx-auto max-w-sm">
                  <img 
                    src={previewUrl} 
                    alt="Aperçu du produit" 
                    className="w-full h-auto max-h-[300px] object-contain rounded-md border"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full"
                    onClick={resetUpload}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {!isAnalyzing && !analysisComplete && (
                  <Button 
                    className="w-full" 
                    onClick={simulateOCRandAIAnalysis}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyser avec l'IA
                  </Button>
                )}
                
                {isAnalyzing && (
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-center">Analyse en cours...</p>
                    <p className="text-xs text-muted-foreground text-center">
                      Extraction du texte et identification des composants...
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      {askingQuestions && (
        <Card className="p-4 border-primary/50 animate-fade-in mt-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              <h3 className="font-medium">L'IA a besoin de plus d'informations</h3>
            </div>
            
            <p className="text-sm">
              {aiQuestions[currentQuestionIndex].question}
            </p>
            
            <div className="flex flex-wrap gap-2">
              {aiQuestions[currentQuestionIndex].options.map(option => (
                <Button
                  key={option}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAnswerQuestion(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
            
            <p className="text-xs text-muted-foreground">
              Cette information aidera à déterminer les tests de {aiQuestions[currentQuestionIndex].impact}.
            </p>
          </div>
        </Card>
      )}
      
      {analysisComplete && !isAnalyzing && !askingQuestions && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-500" />
            <h3 className="font-medium">Analyse complétée</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Nom du produit</label>
              <Input 
                value={extractedData.name} 
                onChange={(e) => setExtractedData(prev => ({...prev, name: e.target.value}))}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={extractedData.description} 
                onChange={(e) => setExtractedData(prev => ({...prev, description: e.target.value}))}
                className="min-h-[80px]"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Catégorie</label>
              <Select 
                value={extractedData.category} 
                onValueChange={(value) => setExtractedData(prev => ({...prev, category: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cosmétique">Cosmétique</SelectItem>
                  <SelectItem value="Entretien">Entretien</SelectItem>
                  <SelectItem value="Alimentaire">Alimentaire</SelectItem>
                  <SelectItem value="Matériaux">Matériaux</SelectItem>
                  <SelectItem value="Pharmaceutique">Pharmaceutique</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Ingrédients identifiés</label>
              <Textarea 
                value={extractedData.ingredients} 
                onChange={(e) => setExtractedData(prev => ({...prev, ingredients: e.target.value}))}
                className="min-h-[60px]"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium">Tests de toxicité recommandés</label>
                <span className="text-xs text-muted-foreground">
                  {extractedData.suggestedTests.length} tests
                </span>
              </div>
              
              <div className="space-y-2">
                {extractedData.suggestedTests.map(test => (
                  <div 
                    key={test.id} 
                    className="flex items-center justify-between p-2 bg-secondary/50 rounded-md"
                  >
                    <span>{test.name}</span>
                    <span className="text-xs px-2 py-0.5 bg-primary/20 rounded-full">
                      {Math.round(test.confidence * 100)}% confiance
                    </span>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground mt-2">
                Vous pouvez modifier ces recommandations selon votre expertise.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={resetUpload}>
              Annuler
            </Button>
            <Button onClick={handleSaveProduct}>
              Enregistrer le produit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
