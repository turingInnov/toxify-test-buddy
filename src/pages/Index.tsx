
import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { 
  Activity,
  Beaker,
  Users,
  Calendar
} from "lucide-react";

const stats = [
  {
    title: "Tests en cours",
    value: "12",
    icon: Activity,
    change: "+2 cette semaine"
  },
  {
    title: "Produits enregistrés",
    value: "45",
    icon: Beaker,
    change: "+5 ce mois"
  },
  {
    title: "Chercheurs actifs",
    value: "28",
    icon: Users,
    change: "+3 ce mois"
  },
  {
    title: "Tests planifiés",
    value: "8",
    icon: Calendar,
    change: "Pour ce mois"
  }
];

export default function Index() {
  return (
    <Layout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold mb-2">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre plateforme de gestion des tests de toxicité
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="stats-card">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
          <Card className="stats-card">
            <h3 className="text-lg font-semibold mb-4">Tests récents</h3>
            <div className="text-sm text-muted-foreground">
              Les données des tests seront affichées ici
            </div>
          </Card>
          
          <Card className="stats-card">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="text-sm text-muted-foreground">
              Les notifications apparaîtront ici
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
