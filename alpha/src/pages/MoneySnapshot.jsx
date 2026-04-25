


import React from 'react';

function MoneySnapshot() {
  return (
    <div className="page">
      <h1>Money Snapshot</h1>
      <p>
        Your personalised financial dashboard will appear here once you provide your monthly salary and select a strategy track.
        </p>


        {/* circular chart should go here, brb */}


        <p>
        This snapshot will show you your current financial position, including your net worth, monthly cash flow, and progress towards your goals.
        </p>
        <p>     Use this information to make informed decisions and adjust your strategy as needed. Remember, the journey to financial independence is a marathon, not a sprint! </p>
    </div>
      const [gross, setGross] = useState("");
  const [net, setNet] = useState("");
  const [rent, setRent] = useState("");
  const [debt, setDebt] = useState("");
  const [goal, setGoal] = useState("");

  const expenses = Number(rent) + Number(debt);
  const remaining = Number(net) - expenses;
  const progress = goal > 0 ? Math.min((remaining / goal) * 100, 100) : 0;

  let nudge = "You’re getting started.";
  if (remaining > 5000) nudge = "Great! You have room to save this month.";
  if (rent > gross * 0.3) nudge = "Your rent is above 30% of gross income.";
  if (remaining < 0) nudge = "Warning: You are overspending.";

  return (
    <div>
      <h1>Money Snapshot</h1>
      <p>Your monthly financial overview.</p>

      <div className="card">
        <input
          type="number"
          placeholder="Gross Salary"
          value={gross}
          onChange={(e) => setGross(e.target.value)}
        />

        <input
          type="number"
          placeholder="Net Salary"
          value={net}
          onChange={(e) => setNet(e.target.value)}
        />

        <input
          type="number"
          placeholder="Rent"
          value={rent}
          onChange={(e) => setRent(e.target.value)}
        />

        <input
          type="number"
          placeholder="Debt Payments"
          value={debt}
          onChange={(e) => setDebt(e.target.value)}
        />

        <input
          type="number"
          placeholder="Savings Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>

      <div className="results">
        <div className="card">
          <h3>Total Expenses</h3>
          <p>R {expenses}</p>
        </div>

        <div className="card">
          <h3>Remaining</h3>
          <p>R {remaining}</p>
        </div>

        <div className="card">
          <h3>Savings Progress</h3>
          <p>{progress.toFixed(0)}%</p>
        </div>

        <div className="card">
          <h3>Nudge</h3>
          <p>{nudge}</p>
        </div>
      </div>
    </div>
  );
}

  function DoughnutChart() {
    return (
      <div> 

      </div>
    )
  }





export default MoneySnapshot;
