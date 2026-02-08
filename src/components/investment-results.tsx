"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/lib/formatters";
import type { CalculationResult } from "@/lib/types";
import { InvestmentChart } from "./investment-chart";
import { BreakdownChart } from "./breakdown-chart";
import { PieChart as PieIcon, TrendingUp, Landmark } from 'lucide-react';


interface InvestmentResultsProps {
  result: CalculationResult;
}

export function InvestmentResults({ result }: InvestmentResultsProps) {
  const { finalAmount, totalContributions, totalInterest, yearlyData } = result;

  const breakdownData = [
    { name: "Versements", value: totalContributions, fill: "hsl(var(--chart-1))" },
    { name: "Intérêts Gagnés", value: totalInterest, fill: "hsl(var(--chart-2))" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Montant Final</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(finalAmount)}</div>
            </CardContent>
        </Card>
        <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total des Versements</CardTitle>
                <Landmark className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalContributions)}</div>
            </CardContent>
        </Card>
        <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Intérêts Gagnés</CardTitle>
                <PieIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-accent">{formatCurrency(totalInterest)}</div>
            </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="xl:col-span-3">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Évolution du Capital</CardTitle>
              <CardDescription>Croissance de votre investissement au fil des ans.</CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentChart data={yearlyData} />
            </CardContent>
          </Card>
        </div>
        <div className="xl:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Répartition</CardTitle>
              <CardDescription>Versements vs. Intérêts.</CardDescription>
            </CardHeader>
            <CardContent>
              <BreakdownChart data={breakdownData} />
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Tableau Année par Année</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <Table>
              <TableHeader className="sticky top-0 bg-card">
                <TableRow>
                  <TableHead className="w-[100px]">Année</TableHead>
                  <TableHead>Solde de Départ</TableHead>
                  <TableHead>Versements</TableHead>
                  <TableHead>Intérêts Gagnés</TableHead>
                  <TableHead className="text-right">Solde Final</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearlyData.map((yearData) => (
                  <TableRow key={yearData.year}>
                    <TableCell className="font-medium">{yearData.year}</TableCell>
                    <TableCell>{formatCurrency(yearData.startBalance)}</TableCell>
                    <TableCell>{formatCurrency(yearData.yearlyContribution)}</TableCell>
                    <TableCell className="text-accent">{formatCurrency(yearData.interestGained)}</TableCell>
                    <TableCell className="text-right font-semibold">{formatCurrency(yearData.endBalance)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
