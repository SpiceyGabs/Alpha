
import { useState, useRef } from 'react';
import '../Styling/MoneySnapshot.css';

// Strategy track colours for consistency across components
const TRACK_RING_COLORS = {
  'The Bystander': '#999999',
  'Steady Pacer':  '#4a90d9',
  'The Sprinter':  '#FF1A25',
  '401K Endurance': '#BA8837',
};

const STRATEGY_TRACKS = [
  'The Bystander',
  'Steady Pacer',
  'The Sprinter',
  '401K Endurance',
];

const PRACTICAL_TIPS = [
  {
    id: 'emergency',
    icon: '🏦',
    title: 'Emergency Buffer',
    text: 'Keep 3–6 months of essential expenses in an immediately accessible account.',
  },
  {
    id: 'invest',
    icon: '📈',
    title: 'Invest Early',
    text: 'Time in the market beats timing the market, starting now is always better than waiting.',
  },
  {
    id: 'rent',
    icon: '🎯',
    title: '30% Rent Rule',
    text: 'Aim to spend no more than 30% of your gross monthly income on rent or a bond.',
  },
  {
    id: 'debt',
    icon: '💳',
    title: 'Clear Debt First',
    text: 'High-interest debt erodes wealth faster than most savings products can grow it.',
  },
];

//  ─ Helper Functions                             
// These live in the JSX file because they are used only by this component.
// If multiple pages need the same calculation, move it to utils/taxCalc.js.

// Formats a number as a South African Rand amount, e.g. 12000 → "R12 000"
function formatRand(amount) {
  return `R${Math.abs(amount).toLocaleString('en-ZA')}`;
}

// Calculates estimated monthly PAYE using 2026/27 SARS brackets
function calculateMonthlyTax(grossMonthly) {
  const annualGross = grossMonthly * 12;
  let annualTax = 0;

  if      (annualGross <= 237100)  annualTax = annualGross * 0.18;
  else if (annualGross <= 370500)  annualTax = 42678  + (annualGross - 237100) * 0.26;
  else if (annualGross <= 512800)  annualTax = 77362  + (annualGross - 370500) * 0.31;
  else if (annualGross <= 673000)  annualTax = 121475 + (annualGross - 512800) * 0.36;
  else if (annualGross <= 857900)  annualTax = 179147 + (annualGross - 673000) * 0.39;
  else if (annualGross <= 1817000) annualTax = 251258 + (annualGross - 857900) * 0.41;
  else                              annualTax = 644489 + (annualGross - 1817000) * 0.45;

  // Subtract the 2026/27 primary rebate of R17 820
  annualTax = Math.max(0, annualTax - 17820);
  return Math.round(annualTax / 12);
}

// Runs the full snapshot calculation and returns a result object
function runCalculation(form) {
  const gross      = Number(form.grossSalary);
  const additional = Number(form.additionalIncome);

  const monthlyTax = calculateMonthlyTax(gross);

  // UIF: 1% of gross, capped at the ceiling income of R17 712 pm
  const uifCeiling = 17712;
  const uif        = Math.round(Math.min(gross, uifCeiling) * 0.01);

  // Pension: standard employer / employee contribution of 10%
  const pension = Math.round(gross * 0.1);

  // Medical Aid: fixed default
  const medAid = 3500;

  const totalDeductions = monthlyTax + uif + pension + medAid;
  const netSalary       = gross - totalDeductions + additional;

  const fixedCosts = (
    Number(form.rent) +
    Number(form.carInstalment) +
    Number(form.debitOrders) +
    Number(form.schoolFees)
  );

  const savings         = Number(form.savingsGoal);
  const availableBalance = netSalary - fixedCosts - savings;
  const rentPct         = gross > 0 ? (Number(form.rent) / gross) * 100 : 0;

  return {
    gross, additional,
    monthlyTax, uif, pension, medAid,
    totalDeductions, netSalary,
    fixedCosts, savings, availableBalance,
    rentPct,
  };
}



// Doughnuts 
function SavingsRing({ savings, net, track }) {
  const radius       = 80;
  const circumference = 2 * Math.PI * radius;
  const percentage   = net > 0 ? Math.min(savings / net, 1) : 0;
  const strokeOffset  = circumference - percentage * circumference;
  const ringColor    = TRACK_RING_COLORS[track] || '#BA8837';

  return (
    <div className="progressRingWrapper">
      <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">


        {/* Background track */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke="#f0eaf0"
          strokeWidth="14"
        />
        
        {/* filled middle */}
        <circle
          cx="100" cy="100" r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth="14"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="ringCenter">
        <p className="ringTrackLabel">{track || 'No Track'}</p>
        <p className="ringAmount">{formatRand(savings)}</p>
        <p className="ringSub">saved this month</p>
      </div>
    </div>
  );
}



function BreakdownRow({ label, value, valueClass }) {
  return (
    <div className="breakdownRow">
      <p className="breakdownLabel">{label}</p>
      <p className={valueClass}>{value}</p>
    </div>
  );
}



// A single goal progress bar
function GoalBar({ label, percentage, animating }) {
  return (
    <div className="goalItem">
      <div className="goalLabelRow">
        <p>{label}</p>
        <p className="goalPercentage">{percentage.toFixed(0)}%</p>
      </div>

    <div className="goalBar">
        <div
          className="goalFill"
          style={{ width: animating ? `${percentage}%` : '0%' }}
        />
      </div>
    </div>
  );
}


// Floating nudge notification
function NudgeToast({ emoji, text, type, onClose }) {
  const toastClass = [
    'nudgeToast',
    type === 'warning' ? 'nudgeToastWarning' : '',
    type === 'great'   ? 'nudgeToastGreat'   : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={toastClass} role="alert">
      <p className="nudgeEmoji">{emoji}</p>
      <p className="nudgeText">{text}</p>
      <button className="nudgeClose" onClick={onClose} aria-label="Dismiss">✕</button>
    </div>
  );
}





function MoneySnapshot() {

  // holds all the user's input values
  const [form, setForm] = useState({
    grossSalary:      70000,
    additionalIncome: 0,
    rent:             12000,
    carInstalment:    0,
    debitOrders:      3000,
    schoolFees:       0,
    savingsGoal:      5000,
    track:            'Steady Pacer',
  });


  // result holds the calculated output (0 until user clicks calculate)

  const [result, setResult]     = useState(null);
  const [animating, setAnimating] = useState(false);

  const [nudges, setNudges]     = useState([]);



  // useRef keeps a counter between renders without causing re-renders
  const nudgeCounter = useRef(0);

  // Updates a single field in the form object when a user types
  function handleFieldChange(field, value) {

    setForm((previousForm) => ({ ...previousForm, [field]: value }));

  }

  // Adds a nudge toast and automatically removes it after 5.5 seconds
  function addNudge(emoji, text, type) {
    nudgeCounter.current += 1;
    const id = nudgeCounter.current;

    setNudges((previous) => [...previous, { id, emoji, text, type }]);
    setTimeout(() => {

      setNudges((previous) => previous.filter((nudge) => nudge.id !== id));
    }, 5500);

  }

  function dismissNudge(id) {
    setNudges((previous) => previous.filter((nudge) => nudge.id !== id));
  }

  function handleCalculate() {

    const calculated = runCalculation(form);
    setResult(calculated);
    setAnimating(true);


    // Trigger context-aware nudges after a short delay so that the UI settles first...
    setTimeout(() => {
      if (calculated.rentPct > 30) {
        addNudge('!', `Your rent is ${calculated.rentPct.toFixed(0)}% of gross income. The recommended cap is 30%.`, 'warning');
      }
      if (calculated.savings >= calculated.netSalary * 0.15) {
        addNudge( 'You are saving over 15% of your net salary - you are on track!', 'great');
      }
      if (calculated.availableBalance < 3000) {
        addNudge('*', 'Your available balance is tight. Review your fixed costs to create more breathing room.', 'warning');
      }
      if (calculated.availableBalance > 10000) {
        addNudge('!!', 'You have a healthy surplus. Consider putting some of it to work in investments.', 'info');
      }
    }, 600);
  }

 
  // Where do goals come from again? The result of the calculations and they show the progress
  const goals = result
    ? [
        {
          id: 'emergency',
          label: 'Emergency Fund (3 months)',
          percentage: Math.min((result.savings * 4 / (result.netSalary * 3)) * 100, 100),
        },
        {
          id: 'monthly',
          label: 'Savings Goal (this month)',
          percentage: 100,
        },
        {
          id: 'annual',
          label: 'Annual Savings Target',
          percentage: Math.min(((result.savings * 3) / (result.savings * 12)) * 100, 100),
        },
      ]
    : [
        { id: 'emergency', label: 'Emergency Fund (3 months)', percentage: 0 },
        { id: 'monthly',   label: 'Savings Goal (this month)', percentage: 0 },
        { id: 'annual',    label: 'Annual Savings Target',      percentage: 0 },
      ];

  return (
    <div className="snapshotPage">

      
      <div className="nudgeContainer" aria-live="polite">
        {nudges.map((nudge) => (
          <NudgeToast
            key={nudge.id}
            emoji={nudge.emoji}
            text={nudge.text}
            type={nudge.type}
            onClose={() => dismissNudge(nudge.id)}
          />
        ))}
      </div>



      <div className="snapHero">

        <p className="snapHeroLabel">Money Snapshot</p>

        <h1>Welcome to your financial overview.</h1>
        <p>Your complete position at a glance. Enter your details below to get started.</p>
      </div>

      <div className="snapInputSection">

        <p className="snapInputTitle">Your financial details</p>
        <div className="inputGrid">

          <div className="inputGroup">
            <label htmlFor="grossSalary">Gross Monthly Salary (R)</label>
            <input

              id="grossSalary"
              type="number"
              value={form.grossSalary}
              onChange={(event) => handleFieldChange('grossSalary', event.target.value)}
              placeholder="e.g. 70000"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="additionalIncome">Additional Income (R)</label>
            <input
              id="additionalIncome"
              type="number"
              value={form.additionalIncome}
              onChange={(event) => handleFieldChange('additionalIncome', event.target.value)}
              placeholder="e.g. 0"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="rent">Monthly Rent / Bond (R)</label>
            <input
              id="rent"
              type="number"
              value={form.rent}
              onChange={(event) => handleFieldChange('rent', event.target.value)}
              placeholder="e.g. 12000"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="carInstalment">Car Instalment (R)</label>
            <input
              id="carInstalment"
              type="number"
              value={form.carInstalment}

            onChange={(event) => handleFieldChange('carInstalment', event.target.value)}
              placeholder="e.g. 0"
            />
          </div>

          <div className="inputGroup">
           <label htmlFor="debitOrders">Monthly Debit Orders (R)</label>
            <input
              id="debitOrders"
              type="number"
              value={form.debitOrders}
              onChange={(event) => handleFieldChange('debitOrders', event.target.value)}
              placeholder="e.g. 3000"
            />
          </div>


          <div className="inputGroup">
            <label htmlFor="schoolFees">School / Course Fees (R)</label>
            <input
              id="schoolFees"
              type="number"
              value={form.schoolFees}
              onChange={(event) => handleFieldChange('schoolFees', event.target.value)}
              placeholder="e.g. 0"
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="savingsGoal">Monthly Savings Goal (R)</label>
            <input
              id="savingsGoal"
              type="number"
              value={form.savingsGoal}
              onChange={(event) => handleFieldChange('savingsGoal', event.target.value)}
              placeholder="e.g. 5000"

            />
          </div>

          <div className="inputGroup">
            <label htmlFor="track">Your Strategy Track</label>
            <select
              id="track"

              value={form.track}
              onChange={(event) => handleFieldChange('track', event.target.value)}
            >
              {STRATEGY_TRACKS.map((trackName) => (
                <option key={trackName} value={trackName}>{trackName}</option>
              ))}

            </select>
          </div>

        </div>
        <button className="buttonCalculate" onClick={handleCalculate}>
          Calculate my snapshot →
       </button>
      </div>

    
      <div className="snapDashboard">

      
        <div className="snapMainGrid">




  {/* Savings Ring */}
          <div className="circleCard">
            <p className="circleCardTitle"> Savings Progress</p>
            <SavingsRing
              savings={result ? result.savings : 0}
              net={result ? result.netSalary : 1}
              track={form.track}
            />
            <div className="ringLegend">
              <div className="legendItem">
                <div className="legendDot legendDotGold" />
                Saved
              </div>
              <div className="legendItem">
                <div className="legendDot legendDotLight" />
                Remaining
              </div>
            </div>
            {result && (
              <p className="ringBalanceNote">
                Available balance:{' '}
                
                <em className="ringBalanceValue">{formatRand(result.availableBalance)}</em>
              </p>
            )}
          </div>

         

          <div className="breakdownCard">
            <h2 className="breakdownTitle">Salary Breakdown</h2>
            {result ? (
              <>
                <BreakdownRow label="Gross Salary" value={formatRand(result.gross)}  valueClass="breakdownValue" />
                <BreakdownRow label="PAYE Tax" value={`-${formatRand(result.monthlyTax)}`} valueClass="breakdownValueNegative" />
                <BreakdownRow label="UIF"  value={`-${formatRand(result.uif)}`} valueClass="breakdownValueNegative" />
                <BreakdownRow label="Pension (10%)"value={`-${formatRand(result.pension)}`} valueClass="breakdownValueNegative" />
                <BreakdownRow label="Medical Aid" value={`-${formatRand(result.medAid)}`} valueClass="breakdownValueNegative" />
                <BreakdownRow label="Total Deductions" value={`-${formatRand(result.totalDeductions)}`} valueClass="breakdownValueNegative" />
                <BreakdownRow label="Net Salary"  value={formatRand(result.netSalary)}  valueClass="breakdownValuePositive" />
                <BreakdownRow label="Fixed Costs" value={`-${formatRand(result.fixedCosts)}`} valueClass="breakdownValueNegative" />
                <BreakdownRow label="Savings This Month" value={`-${formatRand(result.savings)}`} valueClass="breakdownValueNegative" />
                <div className="breakdownRowHighlight">
                  <p className="breakdownHighlightLabel">Available Balance</p>

                  <p className="breakdownValueGold">{formatRand(result.availableBalance)}</p>

                </div>
              </>
            ) : (

              <p className="breakdownEmptyState">
                Enter your details above and click{' '}
                <em className="breakdownEmptyHint">Calculate my snapshot</em>{' '}
                to see your full breakdown.
              </p>
            )}
          </div>

        </div>

{/*This is for Tax & Goals */}
        <div className="snapSecondaryGrid">

{/*Tax Deductions */}
          <div className="infoCard">
            <p className="infoCardLabel">📋 Tax and Deductions</p>
            <h3>2026/27 SARS Breakdown</h3>
            {result ? (
              <>
                <div className="deductionRow">
                  <p>PAYE Income Tax</p>
                <p className="deductionRowValue">-{formatRand(result.monthlyTax)}</p>
            </div>
                <div className="deductionRow">
                  <p>UIF Contribution</p>
                  <p className="deductionRowValue">-{formatRand(result.uif)}</p>
           </div>
                <div className="deductionRow">
                  <p>Pension Fund (10%)</p>
                  <p className="deductionRowValue">-{formatRand(result.pension)}</p>
                </div>
            <div className="deductionRow">
                  <p>Medical Aid</p>
                  <p className="deductionRowValue">-{formatRand(result.medAid)}</p>
            </div>
                <div className="taxNote">
                  ℹ️ Tax is estimated using the 2026/27 SARS income tax brackets
                  with a primary rebate of R17 820.
                </div>
              </>
            ) : (
          <p className="infoCardEmptyState">Run your calculation to see your deductions.</p>
            )}
          </div>




          {/* Goals */}
          <div className="infoCard">
            <p className="infoCardLabel"> Your Goals</p>
            <h3>Progress Tracker</h3>
            {goals.map((goal) => (
              <GoalBar
                key={goal.id}
                label={goal.label}
                percentage={goal.percentage}
                animating={animating}
              />
            ))}
          </div>

        </div>

        {/* Practical Tips */}
        <div className="tipsSection">
          <p className="tipsSectionLabel"> Practical Tips</p>
          <div className="tipsGrid">
            {PRACTICAL_TIPS.map((tip) => (
              <div key={tip.id} className="tipCard">
                <p className="tipIcon">{tip.icon}</p>
                <p className="tipTitle">{tip.title}</p>
                <p className="tipText">{tip.text}</p>
              </div>
              
            ))}
          </div>
        </div>

        
        <div className="snapCtaStrip">
          <div>
            <h3>Ready to run your race?</h3>
            <p>Explore strategy tracks or simulate major financial decisions.</p>
          </div>
          <div className="ctaButtons">
            <a href="/tracks" className="buttonGold">Explore Strategy Tracks →</a>
            <a href="/simlab" className="buttonOutlineWhite">Run a Simulation</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default MoneySnapshot;