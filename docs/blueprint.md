# **App Name**: Compound Interest Simulator

## Core Features:

- Principal Calculator: Calculates compound interest based on initial capital, monthly contributions, annual interest rate, and compounding frequency using the formula VF = P(1+r)^n + PMT × [((1+r)^n - 1) / r].
- Interactive Chart: Displays the growth of capital over time with two lines: one for capital with interest and one for contributions without interest. Tooltips show annual details.
- Scenario Comparison: Allows users to save and compare 2-3 different investment scenarios side-by-side with overlaid charts.
- Google Authentication: Allows users to authenticate via Google to save simulations.
- Simulation Saving: Saves simulation data (initial capital, monthly contribution, interest rate, years, frequency) to Firestore under the user's ID.
- Simulation History: Displays a list of the user's previously saved simulations from Firestore.
- Reverse Calculator: Generative AI tool that estimates the amount you need to save to achieve the desired amount in a certain number of years.

## Style Guidelines:

- Primary color: Deep blue (#3B82F6) to evoke trust and financial stability.
- Background color: Light blue (#E0F7FA), desaturated and bright.
- Accent color: Emerald green (#10B981) to symbolize growth and positive returns.
- Body and headline font: 'Inter', a sans-serif font, for a modern, objective feel.
- Use financial icons such as charts, money, and graphs to represent data and functions.
- Form on the left, results and chart on the right on desktop. Stacked layout on mobile for responsiveness.
- Subtle animations for calculation results and chart updates to enhance user experience.