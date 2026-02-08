import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompoundInterestCalculator } from "@/components/compound-interest-calculator";
import { ReverseCalculator } from "@/components/reverse-calculator";
import { Calculator, Landmark } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 sm:p-8">
      <div className="w-full max-w-7xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary font-headline tracking-tight">
            Simulateur d'Intérêts Composés
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Visualisez la puissance des intérêts composés et planifiez votre avenir financier.
          </p>
        </header>

        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="simulator">
              <Calculator className="mr-2 h-4 w-4" />
              Simulateur
            </TabsTrigger>
            <TabsTrigger value="reverse-calculator">
              <Landmark className="mr-2 h-4 w-4" />
              Calcul Inversé
            </TabsTrigger>
          </TabsList>
          <TabsContent value="simulator" className="mt-6">
            <CompoundInterestCalculator />
          </TabsContent>
          <TabsContent value="reverse-calculator" className="mt-6">
            <ReverseCalculator />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
