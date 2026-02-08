"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { reverseCompoundInterestCalculator } from "@/ai/flows/reverse-compound-interest-calculator";
import { formatCurrency } from "@/lib/formatters";
import { DollarSign, Percent, RefreshCw, Target, PiggyBank, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  futureValue: z.coerce.number({invalid_type_error: "Veuillez entrer un nombre."}).min(1, "L'objectif doit être positif."),
  initialCapital: z.coerce.number({invalid_type_error: "Veuillez entrer un nombre."}).min(0, "Le capital initial doit être positif."),
  interestRate: z.coerce.number({invalid_type_error: "Veuillez entrer un nombre."}).min(0, "Le taux d'intérêt doit être positif."),
  years: z.coerce.number({invalid_type_error: "Veuillez entrer un nombre."}).min(1, "La durée doit être d'au moins 1 an.").max(100),
});

type ReverseCalculatorResult = {
    monthlySavings: number;
}

export function ReverseCalculator() {
  const [result, setResult] = useState<ReverseCalculatorResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      futureValue: 100000,
      initialCapital: 5000,
      interestRate: 7,
      years: 15,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      try {
        const aiResult = await reverseCompoundInterestCalculator(values);
        setResult(aiResult);
      } catch (error) {
        console.error("AI Error:", error);
        toast({
          variant: "destructive",
          title: "Erreur de calcul IA",
          description: "Une erreur s'est produite lors du calcul. Veuillez réessayer.",
        });
      }
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Target />
                    Calculateur d'Objectif
                </CardTitle>
                <CardDescription>
                    Déterminez combien vous devez épargner chaque mois pour atteindre votre objectif financier, avec l'aide de l'IA.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="futureValue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Objectif de capital</FormLabel>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <FormControl>
                                                <Input type="number" placeholder="100 000" {...field} className="pl-9" />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="years"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>En combien d'années ?</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="15" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="initialCapital"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Capital initial</FormLabel>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <FormControl>
                                                <Input type="number" placeholder="5 000" {...field} className="pl-9" />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="interestRate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Taux d'intérêt annuel estimé</FormLabel>
                                        <div className="relative">
                                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <FormControl>
                                                <Input type="number" placeholder="7" step="0.1" {...field} className="pl-9" />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full !mt-6" disabled={isPending}>
                                {isPending ? (
                                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <BrainCircuit className="mr-2 h-4 w-4" />
                                )}
                                Calculer avec l'IA
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="flex items-center justify-center rounded-lg bg-muted/30 p-4">
                    {isPending ? (
                        <div className="flex flex-col items-center gap-4 text-muted-foreground">
                            <RefreshCw className="h-12 w-12 animate-spin text-primary" />
                            <p>L'IA calcule votre plan...</p>
                        </div>
                    ) : result ? (
                        <div className="w-full text-center animate-in fade-in-0 duration-500">
                           <Card className="w-full bg-primary/10 border-primary shadow-inner">
                                <CardHeader className="items-center text-center">
                                    <CardTitle>Épargne Mensuelle Requise</CardTitle>
                                    <PiggyBank className="h-10 w-10 text-primary my-2" />
                                </CardHeader>
                                <CardContent className="text-center">
                                    <p className="text-4xl font-bold text-primary">{formatCurrency(result.monthlySavings)}</p>
                                    <p className="text-muted-foreground mt-1">par mois</p>
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="text-center text-muted-foreground p-8">
                            <PiggyBank className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                            <h3 className="text-xl font-semibold text-foreground mb-2">Votre plan d'épargne sur mesure</h3>
                            <p className="text-sm">Remplissez le formulaire pour découvrir l'épargne mensuelle nécessaire pour atteindre votre objectif.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
