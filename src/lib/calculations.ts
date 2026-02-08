import type { CalculationInput, CalculationResult, YearlyData } from './types';

export function calculateCompoundInterest(input: CalculationInput): CalculationResult {
  const { initialCapital, monthlyContribution, annualInterestRate, years, compoundingFrequency } = input;

  const yearlyData: YearlyData[] = [];
  let currentBalance = initialCapital;
  
  const frequencyMap = {
    monthly: 12,
    quarterly: 4,
    annually: 1,
  };
  const compoundingPeriodsPerYear = frequencyMap[compoundingFrequency];
  const ratePerPeriod = (annualInterestRate / 100) / compoundingPeriodsPerYear;
  const totalMonths = years * 12;

  let balanceAtStartOfYear = initialCapital;
  let yearlyContributionTotal = 0;
  let yearlyInterestTotal = 0;
  
  for (let month = 1; month <= totalMonths; month++) {
    currentBalance += monthlyContribution;
    yearlyContributionTotal += monthlyContribution;
    
    if (month % (12 / compoundingPeriodsPerYear) === 0) {
      const interestThisPeriod = currentBalance * ratePerPeriod;
      currentBalance += interestThisPeriod;
      yearlyInterestTotal += interestThisPeriod;
    }
    
    if (month % 12 === 0) {
      const year = month / 12;
      yearlyData.push({
        year: year,
        startBalance: balanceAtStartOfYear,
        yearlyContribution: yearlyContributionTotal,
        interestGained: yearlyInterestTotal,
        endBalance: currentBalance,
        totalContributions: initialCapital + (monthlyContribution * month),
      });
      balanceAtStartOfYear = currentBalance;
      yearlyContributionTotal = 0;
      yearlyInterestTotal = 0;
    }
  }

  const finalAmount = currentBalance;
  const totalContributions = initialCapital + (monthlyContribution * totalMonths);
  const totalInterest = finalAmount - totalContributions;

  return {
    finalAmount,
    totalContributions,
    totalInterest,
    yearlyData,
  };
}
