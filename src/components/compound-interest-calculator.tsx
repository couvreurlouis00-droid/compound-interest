"use client";

import { useState, useTransition, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { calculateCompoundInterest } from "@/lib/calculations";
import type { CalculationResult, CalculationInput } from "@/lib/types";
import { InvestmentResults } from "./investment-results";
import { DollarSign, Percent, RefreshCw, Calculator, LineChart } from 'lucide-react';

const formSchema = z.object({
  initialCapital: z.coerce.number({invalid_type_error: "Veuillez entrer un nombre."}).min(0, "Le capital initial doit être positif."),
  monthlyContribution: z.coerce.number({invalid_type_error: "Veuillez entrer un nombre."}).min(0, "L'apport mensuel doit être positif."),
  annualInterestRate: z.coerce.number({invalid_type_error: "Veuillez entrer un nombre."}).min(0, "Le taux d'intérêt doit être positif."),
  years: z.array(z.number().min(1).max(50)),
  compoundingFrequency: z.enum(["annually", "quarterly", "monthly"]),
});

export function CompoundInterestCalculator() {
  const [results, setResults] = useState<CalculationResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      initialCapital: 1000,
      monthlyContribution: 100,
      annualInterestRate: 7,
      years: [10],
      compoundingFrequency: "monthly",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
        const calculationInput: CalculationInput = {
            ...values,
            years: values.years[0],
        };
        const newResults = calculateCompoundInterest(calculationInput);
        setResults(newResults);
    });
  }
  
  useEffect(() => {
    form.handleSubmit(onSubmit)();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
      <div className="lg:col-span-2">
        <Card className="shadow-lg bg-card/80 backdrop-blur-sm sticky top-8">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="initialCapital"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Capital initial</FormLabel>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="number" placeholder="1 000" {...field} className="pl-9" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="monthlyContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Apport mensuel</FormLabel>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input type="number" placeholder="100" {...field} className="pl-9" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="annualInterestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taux d'intérêt annuel</FormLabel>
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
                <FormField
                  control={form.control}
                  name="years"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between items-center">
                        <FormLabel>Durée</FormLabel>
                        <span className="text-sm font-medium">{field.value?.[0]} ans</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={1}
                          max={50}
                          step={1}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="py-2"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="compoundingFrequency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fréquence de capitalisation</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez une fréquence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monthly">Mensuelle</SelectItem>
                          <SelectItem value="quarterly">Trimestrielle</SelectItem>
                          <SelectItem value="annually">Annuelle</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full !mt-8" disabled={isPending}>
                  {isPending ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Calculator className="mr-2 h-4 w-4" />
                  )}
                  Calculer
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-3">
        {results ? (
          <div className="animate-in fade-in-0 duration-500">
            <InvestmentResults result={results} />
          </div>
        ) : (
          <Card className="shadow-lg h-full flex items-center justify-center bg-card/80 backdrop-blur-sm min-h-[500px] lg:min-h-[700px]">
            <div className="text-center text-muted-foreground p-8">
                <LineChart className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Vos résultats apparaîtront ici</h3>
                <p>Remplissez le formulaire et cliquez sur "Calculer" pour voir la magie des intérêts composés.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
