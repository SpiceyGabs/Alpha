import { useState } from 'react';
import Nudge from '../components/Nudge';
import ExpandableCard from '../components/ExpandableCard';
import '../Styling/Learn.css';

function Learn() {
  const [expandedSection, setExpandedSection] = useState(null);

  const glossaryTerms = [
    {term: 'PAYE', definition: 'Pay-As-You-Earn: income tax deducted from your salary before you receive it.' },
    {term: 'UIF', definition: 'Unemployment Insurance Fund: provides short-term relief when unemployed or unable to work.' },
    {term: 'RA', definition: 'Retirement Annuity: a long-term investment vehicle with tax benefits for retirement savings.' },
    {term: 'TFSA', definition: 'Tax-Free Savings Account: invest up to R36,000/year tax-free.' },
    {term: 'SARS', definition: 'South African Revenue Service: the tax collection authority.' },
    {term: 'Prime Rate', definition: "The base interest rate banks use for lending: currently 11.75% (SARB repo rate + 3.5%)." },
    {term: 'Bond', definition: "A home loan secured against property: what South Africans call a 'mortgage'." },
    {term: 'Equity', definition: "The portion of your property you truly own (market value minus bond balance)." },
    {term: 'Compound Interest', definition: "Earning returns on your returns - the eighth wonder of the world." },
    {term: 'ETF', definition: 'Exchange-Traded Fund: a basket of investments that trades like a share.' }
  ];

  return (
    <div className="learnPage">
      <div className="snapHero">
        <p className="snapHeroLabel">Learn+</p>
        <h1>Financial Education Hub</h1>
        <p className="simlabHeroSubtitle">
          Build your financial literacy with clear explanations, practical examples, within the South African context.
        </p>
      </div>

        <div className="learnContent">

  <section className="learnSection">
    <h2>Key Financial Concepts</h2>

    <div className="conceptsGrid">

      <ExpandableCard title="Income Tax (PAYE)">
        <p>
          PAYE (Pay-As-You-Earn) is the income tax deducted from your salary before it reaches your bank account. Employers collect this tax on behalf of SARS, meaning most employees pay tax automatically every month.
        </p>

        <div>
          
          <p>
           Eg: If you earn R25 000 per month, PAYE is deducted before your salary reaches your account. What lands in your bank account is your net income, not your gross salary.
          </p>
        </div>

        <h4>2024/25 SARS Tax Brackets</h4>
        <ul>
          <li>R0 – R237 100: 18%</li>
          <li>R237 101 – R370 500: 26%</li>
          <li>R370 501 – R512 800: 31%</li>
          <li>R512 801 – R673 000: 36%</li>
          <li>R673 001 – R857 900: 39%</li>
          <li>R857 901 – R1 817 000: 41%</li>
          <li>R1 817 001+: 45%</li>
        </ul>
      </ExpandableCard>

      <ExpandableCard title="UIF & Deductions">
        <p>
          The Unemployment Insurance Fund (UIF) provides temporary financial support when someone loses employment, becomes ill, or takes maternity, parental, or adoption leave.
        </p>

        <div>
          <h4>Pro Tip</h4>
          <p>
            Employees contribute 1% of their salary to UIF and employers contribute an additional 1% on their behalf. While the deduction seems small, it can provide valuable financial support during difficult periods.
          </p>
        </div>
      </ExpandableCard>

      <ExpandableCard title="Pension vs Retirement Annuity">
        <p>
          Both pensions and Retirement Annuities help South Africans save for retirement, but they function differently.
        </p>

        <div className="comparisonBox">
          <div className="comparisonItem">
            <h4>Work Pension</h4>
            <p>
              Offered through your employer. Contributions are usually deducted automatically and some employers contribute alongside you.
            </p>
          </div>

          <div className="comparisonItem">
            <h4>Retirement Annuity (RA)</h4>
            <p>
              A personal retirement investment that remains yours even when changing jobs. Contributions may qualify for tax deductions.
            </p>
          </div>
        </div>
      </ExpandableCard>

      <ExpandableCard title="Tax-Free Savings Account (TFSA)">
        <p>
          A TFSA allows South Africans to invest money without paying tax on interest, dividends, or capital growth generated within the account.
        </p>

        <div >
          <h4>Power of Tax-Free Investing</h4>
          <p>
            You may contribute up to R36 000 per tax year and R500 000 over your lifetime. Staying within these limits helps maximise long-term growth.
          </p>
        </div>
      </ExpandableCard>

      <ExpandableCard title="Compound Interest">
        <p>
          Compound interest occurs when your investment returns begin generating returns of their own. This creates exponential growth over time.
        </p>

        <div>
          <h4>Reality Check</h4>
          <p>
            Investing R1 000 per month over 20 years at an average return of 8% can result in significant wealth accumulation. Starting early often matters more than investing large amounts later.
          </p>
        </div>
      </ExpandableCard>

    </div>
  </section>

  <section className="learnSection">
    <h2>Strategy Tracks Explained</h2>

    <div className="strategyGrid">

      <div className="strategyCard">
        <h3>The Bystander</h3>
        <p>
          Designed for cautious beginners focused on budgeting, emergency funds, and building financial confidence before investing.
        </p>
      </div>

      <div className="strategyCard">
        <h3>Steady Pacer</h3>
        <p>
          A balanced approach that combines saving and investing while maintaining manageable levels of risk.
        </p>
      </div>

      <div className="strategyCard">
        <h3>The Sprinter</h3>
        <p>
          Focused on accelerated wealth creation through larger contributions and growth-oriented investments.
        </p>
      </div>

      <div className="strategyCard">
        <h3>Endurance Investor</h3>
        <p>
          A long-term strategy centred around retirement planning, property ownership, and sustainable wealth creation.
        </p>
      </div>

    </div>
  </section>

  <section className="learnSection">
    <h2>How Simulations Work</h2>

    <div className="simGuides">

      <ExpandableCard title="Rent vs Buy Property">
        <p>
          This simulation compares the long-term financial impact of renting versus purchasing property. It considers deposits, bond repayments, and interest costs.
        </p>

        <div    >
          <h4>SA Context</h4>
          <p>
            Property ownership may build equity over time, but homeowners must also budget for rates, levies, maintenance, and insurance.
          </p>
        </div>
      </ExpandableCard>

      <ExpandableCard title="Vehicle Affordability">
        <p>
          This simulation estimates whether a vehicle purchase is financially sustainable based on income, deposits, and monthly repayments.
        </p>

        <div    >
          <h4>The 20% Rule</h4>
          <p>
            Many financial planners recommend that transport-related expenses remain below 20% of your monthly take-home income.
          </p>
        </div>
      </ExpandableCard>

      <ExpandableCard title="Investment Growth">
        <p>
          This simulation estimates how monthly investments may grow over time using compound interest principles.
        </p>

        <div    >
          <h4>SA Context</h4>
          <p>
            Popular South African investment vehicles include ETFs, unit trusts, retirement annuities, and tax-free savings accounts.
          </p>
        </div>
      </ExpandableCard>

    </div>
  </section>

  <section className="learnSection">
    <h2>Financial Glossary</h2>

    <div className="glossary">
      {glossaryTerms.map((term, index) => (
        <div key={index} className="glossaryItem">
          <h4>{term.term}</h4>
          <p>{term.definition}</p>
        </div>
      ))}
    </div>
  </section>

  <section className="learnSection">
    <h2>Practical Money Tips</h2>

    <div className="tipsGrid">
      <Nudge
        type="tip"
        title="Emergency Fund First"
        message="Build 3–6 months of expenses before taking on significant investment risk."
        dismissible={false}
      />

      <Nudge
        type="tip"
        title="Start Small, Start Now"
        message="Consistency beats perfection. Small monthly contributions compound significantly over time."
        dismissible={false}
      />

      <Nudge
        type="tip"
        title="Review Subscriptions"
        message="Unused subscriptions can quietly drain thousands of rand every year."
        dismissible={false}
      />

      <Nudge
        type="tip"
        title="Negotiate Your Salary"
        message="Career earnings have one of the biggest impacts on long-term wealth creation."
        dismissible={false}
      />
    </div>
  </section>

</div>
</div>   
  ); 
}

export default Learn;