import { useState } from 'react';
import Nudge from '../components/Nudge';
// import { TAX_EXPLANATIONS, TRACK_EXPLANATIONS, SIMULATION_EXPLANATIONS } from '../utils/financialCalculations';
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
          <h2> Key Financial Concepts</h2>
          <p className="sectionIntro">
            Understanding these concepts will help you make better financial decisions throughout your journey.
          </p>

          <div className="conceptsGrid">
            <ExpandableCard title="Income Tax (PAYE)" >
              <p>{TAX_EXPLANATIONS.paye.content}</p>
              <Callout label="EXAMPLE">
                <p>{TAX_EXPLANATIONS.paye.example}</p>
              </Callout>
              <div className="taxBrackets">
                <h4>2024/25 SARS Tax Brackets:</h4>
                <ul>
                  <li>R0 - R237,100: 18%</li>
                  <li>R237,101 - R370,500: 26%</li>
                  <li>R370,501 - R512,800: 31%</li>
                  <li>R512,801 - R673,000: 36%</li>
                  <li>R673,001 - R857,900: 39%</li>
                  <li>R857,901 - R1,817,000: 41%</li>
                  <li>R1,817,001+: 45%</li>
                </ul>
                <Callout label="PRO TIP">
                  <p>Primary rebate is R17,235 for 2024/25 - you pay no tax on the first R95,750 of annual income.</p>
                </Callout>
              </div>
            </ExpandableCard>

            <ExpandableCard title="UIF & Deductions">
              <p>{TAX_EXPLANATIONS.uif.content}</p>
              <Callout label="PRO TIP">
                <p>{TAX_EXPLANATIONS.uif.example}</p>
              </Callout>
            </ExpandableCard>

            <ExpandableCard title="Pension vs RA" >
              <p>{TAX_EXPLANATIONS.pension.content}</p>
              <div className="comparisonBox">
                <div className="comparisonItem">
                  <h4>Work Pension</h4>
                  <p>Employer-sponsored, often with matching contributions. Access at retirement from that employer.</p>
                </div>
                <div className="comparisonItem">
                  <h4>Retirement Annuity (RA)</h4>
                  <p>Personal retirement vehicle. Portable between jobs, flexible contributions, tax-deductible.</p>
                </div>
              </div>
            </ExpandableCard>

            <ExpandableCard title="Tax-Free Savings Account">
              <p>{TAX_EXPLANATIONS.tfsa.content}</p>
              <Callout label="POWER OF TAX-FREE">
                <p>{TAX_EXPLANATIONS.tfsa.example}</p>
              </Callout>
            </ExpandableCard>

            <ExpandableCard title="Compound Interest" >
              <p>{SIMULATION_EXPLANATIONS.investmentGrowth.content}</p>
              <Callout label="REALITY CHECK">
                <p>{SIMULATION_EXPLANATIONS.investmentGrowth.saContext}</p>
              </Callout>
            </ExpandableCard>
          </div>
        </section>

       
   <section className="learnSection">
      <h2> Strategy Tracks Explained</h2>
        <p className="sectionIntro">
         Each track matches different financial goals, risk tolerance, and time horizons.
        </p>

  <div className="strategyGrid">
    {Object.entries(TRACK_EXPLANATIONS).map(([key, track]) => (
      <div key={key} className="strategyCard">
        <h3>{key === 'bystander' ? 'The Bystander' : 
             key === 'steadyPacer' ? 'Steady Pacer' :
             key === 'sprinter' ? 'The Sprinter' : '401K Endurance'}</h3>
          <p className="strategySummary">{track.summary}</p>
          <div className="strategyStats">
            <div> Risk:{track.riskLevel}</div>
            <div>  \Time:   {track.timeHorizon}</div>
                  <div>  \Returns:   {track.returns}</div>
      </div>
          <p>  \Best for:   {track.bestFor}</p>
           <Callout label="TRADE-OFF"><p>{track.tradeoffs}</p></Callout>
      </div>
   ))}
  </div>
  
   </section>

        <section className="learnSection">
          <h2> ? How Simulations Work</h2>
          <p className="sectionIntro">
            Understand the math behind our calculators to make informed decisions.
          </p>

          <div className="simGuides">
            <ExpandableCard title="Rent vs Buy Property" >
              <p>{SIMULATION_EXPLANATIONS.bondVsRent.content}</p>
              <Callout label="THE FORMULA">
                <p>{SIMULATION_EXPLANATIONS.bondVsRent.formula}</p>
              </Callout>
              <Callout label="SA CONTEXT">
                <p>{SIMULATION_EXPLANATIONS.bondVsRent.saContext}</p>
              </Callout>
            </ExpandableCard>

            <ExpandableCard title="Vehicle Affordability" >
              <p>{SIMULATION_EXPLANATIONS.vehicleFinance.content}</p>
              <Callout label="THE 20% RULE">
                <p>{SIMULATION_EXPLANATIONS.vehicleFinance.formula}</p>
              </Callout>
              <Callout label="SA CONTEXT">
                <p>{SIMULATION_EXPLANATIONS.vehicleFinance.saContext}</p>
              </Callout>
            </ExpandableCard>
          </div>
        </section>

        <section className="learnSection">
          <h2> Financial Glossary</h2>
          <p className="sectionIntro">
            Quick reference for common financial terms you'll encounter.
          </p>

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
          <h2> Practical Money Tips</h2>
          <div className="tipsGrid">
            <Nudge type="tip" title="Emergency Fund First" message="Before investing, build 3-6 months of expenses in an accessible savings account. This prevents debt when unexpected costs arise." dismissible={false} />
            <Nudge type="tip" title="Start Small, Start Now" message="Even R500/month invested at 8% becomes R360,000 after 20 years. Time matters more than amount." dismissible={false} />
            <Nudge type="tip" title="Review Subscriptions" message="The average South African spends R1 200+ monthly on streaming, gym, and app subscriptions - that's R14 400/year you could invest." dismissible={false} />
            <Nudge type="tip" title="Negotiate Your Salary" message="A 10% raise early in your career compounds enormously. Always negotiate- the worst they can say is no." dismissible={false} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Learn;