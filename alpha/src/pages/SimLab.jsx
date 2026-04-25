
import { useState } from 'react';
import '../Styling/Simlab.css';

const SIMULATIONS = [
  {
    id: 'costOfLiving',
    cardClass: 'simlabPickerCardCost',
    title: 'Cost of Living',
    description: 'Calculate and plan your monthly expenses, budget, and lifestyle to understand what you can afford.',
  },
  {
    id: 'property',
    cardClass: 'simlabPickerCardProperty',
    title: 'Rent vs Property',
    description: 'Compare property prices and renting costs. Make an informed decision based on your income and goals for where you are.',
  },
  {
    id: 'vehicle',
    cardClass: 'simlabPickerCardVehicle',
    title: 'Vehicles and Personal Assets',
       description: 'Estimate vehicle finance costs and compare them to your healthy budget.  How much does your dream car really cost? .',
  },
  {
    id: 'investments',
    cardClass: 'simlabPickerCardInvest',
    icon: '📊',
    title: 'Investment Comparison',
     description: 'Compare gold vs USD investment returns over five years using proven financial formulas.',
  },
];

// Tooltip definitions
const TOOLTIPS = {
  salary:   'Your gross monthly income before any deductions. Used to determine affordability ratios.',
  propertyPrice:'The full purchase price of the property you are considering buying.',
  rent:  "The monthly rent you would pay as a tenant for a comparable property.",
   levies:   'Rates, levies, and services are typically 10% of your rental amount for ownership costs.',
  interestRate: 'The SARB repo rate is currently 6.75%. Your loan rate (prime + margin) is typically 11.25%–12%.',
  deposit:    'A deposit reduces the loan amount and your monthly repayment. Aim for at least 10%.',
    loanTerm: 'Home loans in South Africa are typically 20–30 years. Shorter terms mean higher monthly payments but less interest paid overall.',
  vehiclePrice: 'The purchase price of the vehicle. Second-hand Audi RS5 range: R1.17m–R1.65m.',
  monthlyContrib:'The amount you invest each month. Consistency is more important than the starting amount.',
  years:        'Investment growth is exponential - the longer you invest, the more powerful compound growth becomes.',
};



function formatRand(amount) {
  return `R${Math.abs(Math.round(amount)).toLocaleString('en-ZA')}`;
}




// FORMULAE
// Future value of a lump sum: FV = PV × (1 + r)^n
function futureValueLumpSum(principal, annualRate, years) {
  return principal * Math.pow(1 + annualRate, years);
}

// Future value of regular monthly contributions: FV = PMT × [((1 + r)^n - 1) / r]
function futureValueMonthly(monthlyAmount, annualRate, years) {
  const monthlyRate    = annualRate / 12;
  const totalMonths    = years * 12;
  if (monthlyRate === 0) return monthlyAmount * totalMonths;
  return monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
}

// Monthly bond repayment: PMT = P × [r(1+r)^n] / [(1+r)^n - 1]
function monthlyBondRepayment(principal, annualRate, termYears) {
  const monthlyRate  = annualRate / 12;
  const totalMonths  = termYears * 12;
  if (monthlyRate === 0) return principal / totalMonths;
  return principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
}





// Each function receives the form fields object and returns a results object that gets rendered later.

function calculateCostOfLiving(fields) {
  const income = Number(fields.salary) || 0;
  const rent = Number(fields.rent) || 0;

  const food = Number(fields.food) || 0;
  const transport = Number(fields.transport) || 0;
  const debtPayments = Number(fields.debtPayments) || 0;
  const entertainment = Number(fields.entertainment) || 0;


  const totalExpenses = rent + food + transport + debtPayments + entertainment;
  const remaining = income - totalExpenses;
  const rentPct = income > 0 ? (rent / income) * 100 : 0;

  return {
    totalExpenses,remaining,rentPct,
  rentWarning: rentPct > 30,
  };
}

function calculateProperty(fields) {
  const price = Number(fields.propertyPrice) || 0;
  const depositPct= Number(fields.depositPct) || 10;
  const interestRate = (Number(fields.interestRate) || 11.25) / 100;
  const termYears = Number(fields.loanTerm) || 20;
  const monthlyRent= Number(fields.rent) || 0;
  const leviesPct = Number(fields.leviesPct) || 10;

  const deposit = price * (depositPct / 100);
  const loanAmount = price - deposit;
  const monthlyRepayment= monthlyBondRepayment(loanAmount, interestRate, termYears);
  const monthlyLevies = monthlyRepayment * (leviesPct / 100);
  const totalMonthlyOwn = monthlyRepayment + monthlyLevies;
  const totalCostOwnership = totalMonthlyOwn * termYears * 12 + deposit;
  const totalCostRenting = monthlyRent * termYears * 12;
  const difference = totalCostOwnership - totalCostRenting;
  const rentAdvantage  = difference > 0;

  return {
    deposit,
  loanAmount,monthlyRepayment,
    monthlyLevies,
    totalMonthlyOwn,
    totalCostOwnership,
    totalCostRenting,
    difference,
    rentAdvantage,
    termYears,
    price,
  };
}

function calculateVehicle(fields) {

  const price = Number(fields.vehiclePrice) || 1450000;
  const depositPc = Number(fields.vehicleDeposit) || 10;
  const termMonths= Number(fields.vehicleTerm) || 60;
  const annualRate= (Number(fields.vehicleRate) || 12) / 100;
  const netSalary= Number(fields.salary) || 0;

  const deposit  = price * (depositPct / 100);
  const financeAmount= price - deposit;
  const monthlyRate = annualRate / 12;
  const monthlyPayment = financeAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
  const safeMax = netSalary * 0.20;
  const isAffordable = monthlyPayment <= safeMax;
  const insurance = price * 0.015 / 12;
  const totalMonthly = monthlyPayment + insurance;

  return {
    deposit,
    financeAmount,
    monthlyPayment,
    totalMonthly,
    insurance,
    safeMax,
    isAffordable,
  };
}

function calculateInvestments(fields) {
  const monthly   = Number(fields.monthlyContrib) || 5000;
  const years     = Number(fields.years) || 5;


  // The for gold: historical average annual return is ~8% over 5 years
  const goldRate  = 0.08;


  // USD 
  //  ~5.5% annually over 5 years, including currency effects
  const usdRate   = 0.055;

  const goldFV= futureValueMonthly(monthly, goldRate, years);
  const usdFV = futureValueMonthly(monthly, usdRate, years);
  const totalContributed = monthly * years * 12;
  const goldGain = goldFV - totalContributed;
  const usdGain  = usdFV  - totalContributed;

  return {
    goldFV,
    usdFV,
    totalContributed,
    goldGain,
    usdGain,
    goldWins: goldFV > usdFV,
    difference: Math.abs(goldFV - usdFV),
    years,
  };
}





const DEFAULT_FIELDS = {
  costOfLiving: {
    salary: 43300, rent: 12000, food: 3500,
    transport: 2000, debtPayments: 2000, entertainment: 1500,
  },
  property: {
    propertyPrice: 1200000, depositPct: 10, interestRate: 11.25,
    loanTerm: 20, rent: 10000, leviesPct: 10,
  },
  vehicle: {
    vehiclePrice: 1450000, vehicleDeposit: 10, vehicleTerm: 60,
    vehicleRate: 12, salary: 43300,
  },
  investments: {
    monthlyContrib: 5000, years: 5,
  },
};


// Input definitions per simulation: each entry describes one form field
const SIM_INPUTS = {
  costOfLiving: {
    columnA: [
      { key: 'salary', label: 'Gross Monthly Salary (R)', tip: 'salary' },
      { key: 'rent',  label: 'Monthly Rent / Bond (R)',  tip: 'rent' },
      { key: 'food',   label: 'Food and Groceries (R)',   tip: null },
    ],
    columnB: [
      { key: 'transport', label: 'Transport (R)',  tip: null },
      { key: 'debtPayments',  label: 'Debt Repayments (R)', tip: null },
      { key: 'entertainment', label: 'Entertainment (R)',  tip: null },
    ],
  },
  property: {
    columnA: [
      { key: 'propertyPrice', label: 'Property Price (R)', tip: 'propertyPrice' },
      { key: 'depositPct', label: 'Deposit (%)', tip: 'deposit' },
      { key: 'interestRate',label: 'Interest Rate (%)',tip: 'interestRate' },
      { key: 'loanTerm',  label: 'Loan Term (years)',  tip: 'loanTerm' },
    ],
    columnB: [
      { key: 'rent',label: 'Comparable Rent / Month (R)',tip: 'rent' },
      { key: 'leviesPct', label: 'Levies and Rates (%)', tip: 'levies' },
    ],
  },
  vehicle: {
    columnA: [
      { key: 'vehiclePrice',label: 'Vehicle Price (R)',   tip: 'vehiclePrice' },
      { key: 'vehicleDeposit', label: 'Deposit (%)', tip: 'deposit' },
    ],
    columnB: [
      { key: 'vehicleTerm',  label: 'Loan Term (months)',   tip: 'loanTerm' },
      { key: 'vehicleRate',  label: 'Interest Rate (%)', tip: 'interestRate' },
      { key: 'salary',  label: 'Net Monthly Salary (R)', tip: 'salary' },
    ],
  },
  investments: {
    columnA: [
      { key: 'monthlyContrib', label: 'Monthly Contribution (R)', tip: 'monthlyContrib' },
    ],
    columnB: [
      { key: 'years', label: 'Investment Horizon (years)', tip: 'years' },
    ],
  },
};







function InfoTile({ text }) {
  return (
    <div className="infoTile">
      {text}{' '}
      <a href="/learn" className="infoTileLink">Learn more →</a>
    </div>
  );
}

function SimInputField({ fieldKey, label, tipKey, value, onChange }) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div className="simInputGroup">
      <label htmlFor={fieldKey}>
        {label}
    {tipKey && (
          <button
            className="infoTrigger"
            onClick={() => setShowTip((previous) => !previous)}
            aria-label={`Info about ${label}`}
            type="button"
          >
            🛈
          </button>
        )}
      </label>
      <input
        id={fieldKey}
        type="number"
        value={value}
        onChange={(event) => onChange(fieldKey, event.target.value)}
      />
      {showTip && tipKey && <InfoTile text={TOOLTIPS[tipKey]} />}
    </div>
  );
}



// Results panels  for the simulation types


function CostOfLivingResults({ data }) {
  return (
    <div className="simResults">
      <p className="simResultsTitle">Your Cost of Living Breakdown</p>
      {data.rentWarning && (
        <div className="overspendNudge">
          <p className="overspendNudgeText">

            ! Your rent is{' '}
            <em className="overspendNudgeHighlight">{data.rentPct.toFixed(0)}% of your income</em>.
            The recommended maximum is 30%. Consider areas with lower rental rates.
          </p>
        </div>
      )}
      <div className="simResultColumns">
        <div className="simResultCard">
          <p className="simResultCardTitle">Total Monthly Expenses</p>
          <p className="simResultValue">{formatRand(data.totalExpenses)}</p>
          <p className="simResultLabel">Fixed and variable costs combined</p>
        </div>
        <div className="simResultCard">
          <p className="simResultCardTitle">Remaining After Expenses</p>
          <p className="simResultValue">{formatRand(data.remaining)}</p>
          <p className="simResultLabel">Available for savings and investing</p>
        </div>
      </div>
      <div className="simVerdict">
        <p className="simVerdictTitle"> ? Verdict</p>
        <p className="simVerdictText">
          {data.remaining >= 5000
            ? 'You have healthy breathing room after your monthly expenses. Consider directing some of that surplus into a Strategy Track.'
            : data.remaining >= 0
              ? 'Your budget is tight but manageable. Look at entertainment and transport for quick savings opportunities.'
              : 'Your expenses exceed your income this month. Prioritise reducing discretionary spending immediately.'}
        </p>
      </div>
      <div className="simNextSteps">
        <a href="/tracks" className="buttonGold">Explore Strategy Tracks →</a>
        <a href="/snapshot" className="buttonSecondary">Adjust Snapshot Inputs</a>
        <a href="/learn" className="buttonSecondary">Learn More</a>
      </div>
    </div>
  );
}

function PropertyResults({ data }) {
  return (
    <div className="simResults">
      <p className="simResultsTitle">Rent vs Property - {data.termYears} Year Comparison</p>
      <div className="simResultColumns">
        <div className="simResultCard">
          <p className="simResultCardTitle">Monthly Bond Repayment</p>
          <p className="simResultValue">{formatRand(data.monthlyRepayment)}</p>
          <p className="simResultLabel">Plus levies: {formatRand(data.monthlyLevies)} pm = {formatRand(data.totalMonthlyOwn)} total</p>
        </div>
        <div className="simResultCard">
          <p className="simResultCardTitle">Monthly Rent</p>
          <p className="simResultValue">{formatRand(data.totalCostRenting / (data.termYears * 12))}</p>
          <p className="simResultLabel">No equity built - pure occupancy cost</p>
        </div>
        <div className="simResultCard">
          <p className="simResultCardTitle">Total Cost to Own ({data.termYears} yrs)</p>
          <p className="simResultValue">{formatRand(data.totalCostOwnership)}</p>
          <p className="simResultLabel">Including deposit of {formatRand(data.deposit)}</p>
        </div>
        <div className="simResultCard">
          <p className="simResultCardTitle">Total Cost to Rent ({data.termYears} yrs)</p>
          <p className="simResultValue">{formatRand(data.totalCostRenting)}</p>
          <p className="simResultLabel">No asset built at the end</p>
        </div>
      </div>
      <div className="simVerdict">
        <p className="simVerdictTitle"> ? Verdict</p>
        <p className="simVerdictText">
          {data.rentAdvantage
            ? `Renting saves you ${formatRand(data.difference)} over ${data.termYears} years at these numbers. However, ownership builds equity - factor in likely property appreciation before deciding.`
            : `Buying is ${formatRand(data.difference)} cheaper over ${data.termYears} years at these rates, and you own the asset at the end. If you can cover the deposit and afford the monthly costs, buying builds long-term wealth.`}
        </p>
      </div>
      <div className="simNextSteps">
        <a href="/tracks" className="buttonGold">Explore Strategy Tracks →</a>
        <a href="/learn" className="buttonSecondary">Learn More</a>
      </div>
    </div>
  );
}

function VehicleResults({ data }) {
  return (
    <div className="simResults">
      <p className="simResultsTitle">Vehicle Affordability Analysis</p>
      {!data.isAffordable && (
        <div className="overspendNudge">
          <p className="overspendNudgeText">
            ⚠️ Your estimated monthly payment of{' '}
            <em className="overspendNudgeHighlight">{formatRand(data.monthlyPayment)}</em>{' '}
            exceeds the safe 20% budget of{' '}
            <em className="overspendNudgeHighlight">{formatRand(data.safeMax)}</em>.
            Consider a larger deposit, longer term, or a lower-priced vehicle.
          </p>
        </div>
      )}
      <div className="simResultColumns">
        <div className="simResultCard">
          <p className="simResultCardTitle">Monthly Bond Repayment</p>
          <p className="simResultValue">{formatRand(data.monthlyPayment)}</p>
          <p className="simResultLabel">Capital repayment only (excl. insurance and fuel)</p>
        </div>
        <div className="simResultCard">
          <p className="simResultCardTitle">Safe Monthly Budget</p>
          <p className="simResultValue">{formatRand(data.safeMax)}</p>
          <p className="simResultLabel">20% of your net salary - the recommended maximum</p>
        </div>
        <div className="simResultCard">
          <p className="simResultCardTitle">Estimated Insurance</p>
          <p className="simResultValue">{formatRand(data.insurance)}</p>
          <p className="simResultLabel">Approx 1.5% of vehicle value per year</p>
        </div>
        <div className="simResultCard">
          <p className="simResultCardTitle">Total Monthly Cost</p>
          <p className="simResultValue">{formatRand(data.totalMonthly)}</p>
          <p className="simResultLabel">Repayment + insurance. Add fuel and maintenance separately.</p>
        </div>
      </div>
      <div className="simVerdict">
        <p className="simVerdictTitle"> ? Verdict</p>
        <p className="simVerdictText">
          {data.isAffordable
            ? 'This vehicle fits within your safe budget. Remember to factor in fuel, maintenance, and insurance renewals annually.'
            : 'This vehicle stretches significantly beyond what your income safely supports. Consider increasing your deposit or exploring a more affordable alternative first.'}
        </p>
      </div>
      <div className="simNextSteps">
        <a href="/tracks" className="buttonGold">Explore Strategy Tracks →</a>
        <a href="/learn" className="buttonSecondary">Learn More</a>
      </div>
    </div>
  );
}

function InvestmentResults({ data }) {
  return (
    <div className="simResults">
      <p className="simResultsTitle">Investment Comparison - {data.years} Years</p>
      <div className="simResultColumns">
        <div className="simResultCard">
          <p className="simResultCardTitle">Gold Investment (8% pa)</p>
          <p className="simResultValue">{formatRand(data.goldFV)}</p>
          <p className="simResultLabel">Gain: {formatRand(data.goldGain)} on {formatRand(data.totalContributed)} contributed</p>
        </div>
        <div className="simResultCard">
          <p className="simResultCardTitle">USD Fund Investment (5.5% pa)</p>
          <p className="simResultValue">{formatRand(data.usdFV)}</p>
          <p className="simResultLabel">Gain: {formatRand(data.usdGain)} on {formatRand(data.totalContributed)} contributed</p>
        </div>
      </div>
      <div className="simVerdict">
        <p className="simVerdictTitle"> ? Verdict</p>
        <p className="simVerdictText">
          {data.goldWins
            ? `Gold outperforms the USD fund by ${formatRand(data.difference)} over ${data.years} years at these rates. However, gold is more volatile - diversification across both is often the wiser approach.`
            : `The USD fund outperforms gold by ${formatRand(data.difference)} over ${data.years} years at these rates. Currency diversification also protects against rand weakness.`}
        </p>
      </div>
      <div className="simNextSteps">
        <a href="/tracks" className="buttonGold">Explore Strategy Tracks →</a>
        <a href="/learn" className="buttonSecondary">Learn More</a>
      </div>
    </div>
  );
}





function Simlab() {
  const [activeSim, setActiveSim]   = useState(null);
  const [fields, setFields]         = useState({});
  const [results, setResults]       = useState(null);

  function handlePickerSelect(simId) {
    setActiveSim(simId);
    setFields(DEFAULT_FIELDS[simId]);
    setResults(null);
  }

  function handleFieldChange(key, value) {
    setFields((previous) => ({ ...previous, [key]: value }));
  }

  function handleRunSimulation() {
    if (activeSim === 'costOfLiving') setResults(calculateCostOfLiving(fields));
    if (activeSim === 'property')     setResults(calculateProperty(fields));
    if (activeSim === 'vehicle')      setResults(calculateVehicle(fields));
    if (activeSim === 'investments')  setResults(calculateInvestments(fields));
  }

  function handleReset() {
    setResults(null);
    setFields(DEFAULT_FIELDS[activeSim]);
  }

  const activeSimDef  = SIMULATIONS.find((sim) => sim.id === activeSim);
  const activeInputs  = activeSim ? SIM_INPUTS[activeSim] : null;

  return (
    <div className="simlabPage">

      <div className="snapHero">
        <p className="snapHeroLabel">Simulation Lab</p>
        <h1>Simulation Lab</h1>
        <p className="simlabHeroSubtitle">
          Experiment with real financial decisions and make informed choices before you commit.
        </p>
      </div>

      <div className="simlabContent">

  {/* The grid */}
        <div className="simlabPickerGrid">
          {SIMULATIONS.map((sim) => (
            <div
              key={sim.id}
              className={`simlabPickerCard ${sim.cardClass} ${activeSim === sim.id ? 'simlabPickerCardActive' : ''}`}
              onClick={() => handlePickerSelect(sim.id)}
            >
              <p className="pickerCardIcon">{sim.icon}</p>
              <h3 className="pickerCardTitle">{sim.title}</h3>
              <p className="pickerCardDesc">{sim.description}</p>
              <button
                className="buttonCalculate"
                onClick={(event) => { event.stopPropagation(); handlePickerSelect(sim.id); }}
              >
                Calculate
              </button>
            </div>
          ))}
        </div>




        {/* Active panel */}
        {activeSim && activeSimDef && activeInputs && (
          <div className="simPanel">
            <div className="simPanelHeader">
              <p className="simPanelIcon">{activeSimDef.icon}</p>
              <h2 className="simPanelTitle">{activeSimDef.title}</h2>
            </div>

            {/* Two-column inputs and results */}
            <div className="simInputColumns">
              <div>
                <p className="simColumnTitle">Variable A</p>
                {activeInputs.columnA.map((field) => (
                  <SimInputField
                    key={field.key}
                    fieldKey={field.key}
                    label={field.label}
                    tipKey={field.tip}
                    value={fields[field.key] ?? ''}
                    onChange={handleFieldChange}
                  />
                ))}
              </div>
              <div>
                <p className="simColumnTitle">Variable B</p>
                {activeInputs.columnB.map((field) => (
                  <SimInputField
                    key={field.key}
                    fieldKey={field.key}
                    label={field.label}
                    tipKey={field.tip}
                    value={fields[field.key] ?? ''}
                    onChange={handleFieldChange}
                  />
                ))}
              </div>
            </div>

            <div className="simRunRow">
              <button className="buttonRunSim" onClick={handleRunSimulation}>
                Run simulation →
              </button>
              <button className="buttonReset" onClick={handleReset}>
                Reset inputs
              </button>
            </div>


{/* RESULTS:  */}
            {results && activeSim === 'costOfLiving' && <CostOfLivingResults data={results} />}
            {results && activeSim === 'property' && <PropertyResults data={results} />}
            {results && activeSim === 'vehicle'  && <VehicleResults data={results} />}
            {results && activeSim === 'investments'  && <InvestmentResults data={results} />}

          </div>
        )}

      </div>
    </div>
  );
}

export default Simlab;