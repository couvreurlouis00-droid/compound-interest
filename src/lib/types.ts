export interface CalculationInput {
  initialCapital: number;
  monthlyContribution: number;
  annualInterestRate: number;
  years: number;
  compoundingFrequency: 'annually' | 'quarterly' | 'monthly';
}

export interface YearlyData {
  year: number;
  startBalance: number;
  yearlyContribution: number;
  interestGained: number;
  endBalance: number;
  totalContributions: number;
}

export interface CalculationResult {
  finalAmount: number;
  totalContributions: number;
  totalInterest: number;
  yearlyData: YearlyData[];
}
