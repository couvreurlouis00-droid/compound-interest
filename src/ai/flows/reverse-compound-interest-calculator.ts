'use server';

/**
 * @fileOverview A reverse compound interest calculator AI agent.
 *
 * - reverseCompoundInterestCalculator - A function that calculates the monthly savings needed to reach a financial goal.
 * - ReverseCompoundInterestCalculatorInput - The input type for the reverseCompoundInterestCalculator function.
 * - ReverseCompoundInterestCalculatorOutput - The return type for the reverseCompoundInterestCalculator function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReverseCompoundInterestCalculatorInputSchema = z.object({
  futureValue: z.number().describe('The desired future value in euros.'),
  years: z.number().describe('The number of years to reach the future value.'),
  interestRate: z.number().describe('The annual interest rate as a percentage.'),
  initialCapital: z.number().describe('The initial capital in euros.'),
});
export type ReverseCompoundInterestCalculatorInput = z.infer<
  typeof ReverseCompoundInterestCalculatorInputSchema
>;

const ReverseCompoundInterestCalculatorOutputSchema = z.object({
  monthlySavings: z
    .number()
    .describe(
      'The estimated monthly savings needed to reach the desired future value in euros.'
    ),
});
export type ReverseCompoundInterestCalculatorOutput = z.infer<
  typeof ReverseCompoundInterestCalculatorOutputSchema
>;

export async function reverseCompoundInterestCalculator(
  input: ReverseCompoundInterestCalculatorInput
): Promise<ReverseCompoundInterestCalculatorOutput> {
  return reverseCompoundInterestCalculatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reverseCompoundInterestCalculatorPrompt',
  input: {schema: ReverseCompoundInterestCalculatorInputSchema},
  output: {schema: ReverseCompoundInterestCalculatorOutputSchema},
  prompt: `You are a financial advisor helping users determine how much they need to save monthly to reach a specific financial goal.

  Given the desired future value, the number of years, the annual interest rate, and the initial capital, calculate the required monthly savings.

  Desired Future Value: {{futureValue}} euros
  Years: {{years}}
  Annual Interest Rate: {{interestRate}}%
  Initial Capital: {{initialCapital}} euros

  Calculate the monthly savings needed to reach the desired future value.
  Consider the compound interest formula VF = P(1+r)^n + PMT × [((1+r)^n - 1) / r], where:
  VF = Future Value
  P = Initial Capital
  r = Monthly interest rate (annual interest rate / 12)
  n = Number of months (years * 12)
  PMT = Monthly Payment (savings)

  Provide only the monthly savings amount in euros.
`,
});

const reverseCompoundInterestCalculatorFlow = ai.defineFlow(
  {
    name: 'reverseCompoundInterestCalculatorFlow',
    inputSchema: ReverseCompoundInterestCalculatorInputSchema,
    outputSchema: ReverseCompoundInterestCalculatorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
