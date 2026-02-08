"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/formatters";
import type { YearlyData } from "@/lib/types";

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
          <p className="font-bold mb-1">{`Année ${label}`}</p>
          <p className="text-sm" style={{color: 'hsl(var(--primary))'}}>{`Capital avec intérêts: ${formatCurrency(payload[0].value)}`}</p>
          <p className="text-sm" style={{color: 'hsl(var(--accent))'}}>{`Versements seuls: ${formatCurrency(payload[1].value)}`}</p>
        </div>
      );
    }
  
    return null;
};

interface InvestmentChartProps {
  data: YearlyData[];
}

export function InvestmentChart({ data }: InvestmentChartProps) {
  return (
    <div className="h-[350px] w-full text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="year" 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(Number(value))}
            tickLine={false}
            axisLine={false}
            tickMargin={4}
            width={80}
            domain={['dataMin', 'dataMax']}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '3 3' }} />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="endBalance" 
            name="Capital avec intérêts"
            stroke="hsl(var(--primary))" 
            strokeWidth={2.5}
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="totalContributions"
            name="Versements seuls"
            stroke="hsl(var(--accent))" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
