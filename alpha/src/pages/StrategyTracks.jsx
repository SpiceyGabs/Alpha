// StrategyTracks.jsx
// This file contains ONLY component structure and JavaScript logic.
// All visual styling lives in StrategyTracks.css

import { useState } from 'react';
import './StrategyTracks.css';

// ─── Track Data ───────────────────────────────────────────────────────────────
// Keeping track data here makes it easy to add or edit tracks without
// touching any JSX or CSS — in a larger app this would live in data/tracks.js

const TRACKS = [
  {
    id: 'bystander',
    cardClass: 'trackCardBystander',
    medal: '🥉',
    name: 'The Bystander',
    tagline: 'Scared to invest? All great athletes start somewhere. Explore short-term savings first.',
    roi: '2% per annum',
    risk: 'Very Low',
    term: 'Open-ended',
    contributionRate: 0.05,   // 5% of net salary
    nudge: '"Try saving R500 this month to get started, or learn how investing works before jumping in."',
    milestones: [
      { year: 'Year 1', desc: 'Track expenses consistently' },
      { year: 'Year 2', desc: 'Build a medium emergency fund (4–6 months)' },
      { year: 'Year 3–4', desc: 'Begin structured saving habits' },
      { year: 'Year 5', desc: 'Transition into a more active track' },
    ],
    tradeOffs: 'Very low risk. Slow financial growth. May miss long-term wealth-building opportunities.',
  },
  {
    id: 'pacer',
    cardClass: 'trackCardPacer',
    medal: '🥈',
    name: 'Steady Pacer',
    tagline: 'Balance between saving and investing, with moderate risk. Build stability over time.',
    roi: '4.1% per annum',
    risk: 'Moderate',
    term: '36–60 months',
    contributionRate: 0.12,
    nudge: '"You\'re on track with your savings goal — keep your pace steady."',
    milestones: [
      { year: 'Year 1', desc: 'Build a 3-month emergency fund' },
      { year: 'Year 2', desc: 'Reduce high-interest debt' },
      { year: 'Year 3', desc: 'Begin consistent investment contributions' },
      { year: 'Year 4–5', desc: 'Grow a diversified savings and investment portfolio' },
    ],
    tradeOffs: 'Balanced risk and reward. Slower returns than aggressive strategies. Strong long-term stability.',
  },
  {
    id: 'sprinter',
    cardClass: 'trackCardSprinter',
    medal: '🥇',
    name: 'The Sprinter',
    tagline: 'Aggressive growth for ambitious, high-earning individuals focused on rapid wealth accumulation.',
    roi: '5% per annum',
    risk: 'High',
    term: '24 months',
    contributionRate: 0.20,
    nudge: '"You are holding excess cash that could be invested. Consider offshore diversification."',
    milestones: [
      { year: 'Year 1', desc: 'Start investing immediately' },
      { year: 'Year 2', desc: 'Increase contribution rate significantly' },
      { year: 'Year 3–4', desc: 'Diversify locally and offshore (or crypto)' },
      { year: 'Year 5', desc: 'Achieve strong portfolio growth' },
    ],
    tradeOffs: 'High potential returns. Higher volatility and risk. Less financial safety buffer.',
  },
  {
    id: 'endurance',
    cardClass: 'trackCardEndurance',
    medal: '🏅',
    name: '401K Endurance',
    tagline: 'Long-term focus on retirement, property, and stability. Disciplined and structured.',
    roi: '7% per annum',
    risk: 'Low (locked)',
    term: '30-day notice',
    contributionRate: 0.15,
    nudge: '"Consider increasing your retirement contribution to unlock significant tax benefits."',
    milestones: [
      { year: 'Year 1–2', desc: 'Consistent retirement annuity contributions' },
      { year: 'Year 3', desc: 'Property purchase or strong deposit readiness' },
      { year: 'Year 4–5', desc: 'Build equity and long-term financial stability' },
    ],
    tradeOffs: 'Slower liquidity — money is tied up. Lower short-term flexibility for strong long-term asset growth.',
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

function formatRand(amount) {
  return `R${Math.abs(amount).toLocaleString('en-ZA')}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TrackCard({ track, isSelected, netSalary, onSelect }) {
  const monthlyContribution = netSalary > 0
    ? Math.round(netSalary * track.contributionRate)
    : null;

  const cardClasses = [
    'trackCard',
    track.cardClass,
    isSelected ? 'trackCardSelected' : '',
  ].filter(Boolean).join(' ');

  return (
    <article className={cardClasses}>
      <div className="trackCardHeader">
        <p className="trackMedal">{track.medal}</p>
        {isSelected && <p className="trackSelectedBadge">Your Track</p>}
      </div>

      <h3 className="trackName">{track.name}</h3>
      <p className="trackTagline">{track.tagline}</p>

      <div className="trackStats">
        <div className="trackStat">
          <p className="trackStatLabel">ROI</p>
          <p className="trackStatValue">{track.roi}</p>
        </div>
        <div className="trackStat">
          <p className="trackStatLabel">Risk</p>
          <p className="trackStatValue">{track.risk}</p>
        </div>
        <div className="trackStat">
          <p className="trackStatLabel">Term</p>
          <p className="trackStatValue">{track.term}</p>
        </div>
      </div>

      {monthlyContribution && (
        <div className="trackContribution">
          <p className="trackContributionLabel">Suggested Monthly Contribution</p>
          <p className="trackContributionAmount">{formatRand(monthlyContribution)}</p>
          <p className="trackContributionSub">({(track.contributionRate * 100).toFixed(0)}% of your net salary)</p>
        </div>
      )}

      <div className="trackMilestones">
        <p className="trackMilestonesTitle">Milestones</p>
        {track.milestones.map((milestone) => (
          <div key={milestone.year} className="milestoneLine">
            <div className="milestoneDot" />
            <p>{milestone.year}: {milestone.desc}</p>
          </div>
        ))}
      </div>

      <div className="trackNudge">{track.nudge}</div>

      <button
        className={`buttonSelectTrack ${isSelected ? 'buttonSelectTrackActive' : 'buttonSelectTrackDefault'}`}
        onClick={() => onSelect(track.id)}
      >
        {isSelected ? '✓ Current Track Selected' : 'Select this track →'}
      </button>
    </article>
  );
}

function MilestoneTimeline({ milestones, currentYear }) {
  return (
    <div className="milestoneTimeline">
      {milestones.map((milestone, index) => {
        const isActive = index < currentYear;
        return (
          <div key={milestone.year} className="milestoneStep">
            <div className={`milestoneCircle ${isActive ? 'milestoneCircleActive' : ''}`}>
              {index + 1}
            </div>
            <p className={`milestoneYear ${isActive ? 'milestoneYearActive' : ''}`}>
              {milestone.year}
            </p>
            <p className="milestoneDesc">{milestone.desc}</p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

function StrategyTracks() {
  const [netSalary, setNetSalary]         = useState('');
  const [emergencyFund, setEmergencyFund] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('pacer');

  const parsedNetSalary = Number(netSalary) || 0;

  const activeTrack = TRACKS.find((track) => track.id === selectedTrack);

  return (
    <div className="tracksPage">

      {/* ── Hero ── */}
      <div className="tracksHero">
        <p className="tracksHeroLabel">● Strategy Tracks</p>
        <h1>Saving Plans</h1>
        <p className="tracksHeroQuote">
          "The best time to train your wallet for a marathon was 20 years ago. The next best time is now."
        </p>
      </div>

      {/* ── Input Panel ── */}
      <div className="tracksInputPanel">
        <p className="tracksInputLabel">📝 Your details (optional — unlocks personalised contribution amounts)</p>
        <div className="tracksInputRow">
          <div className="inputGroup">
            <label htmlFor="netSalary">Net Monthly Salary (R)</label>
            <input
              id="netSalary"
              type="number"
              value={netSalary}
              onChange={(event) => setNetSalary(event.target.value)}
              placeholder="e.g. 43300"
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="emergencyFund">Current Emergency Fund (R)</label>
            <input
              id="emergencyFund"
              type="number"
              value={emergencyFund}
              onChange={(event) => setEmergencyFund(event.target.value)}
              placeholder="e.g. 11000"
            />
          </div>
        </div>
      </div>

      {/* ── Track Cards ── */}
      <div className="tracksContent">
        <p className="tracksSectionLabel">Choose your pace</p>
        <h2 className="tracksSectionTitle">Which race strategy fits you?</h2>

        <div className="tracksGrid">
          {TRACKS.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isSelected={selectedTrack === track.id}
              netSalary={parsedNetSalary}
              onSelect={setSelectedTrack}
            />
          ))}
        </div>

        {/* Fees transparency strip */}
        <div className="feesStrip">
          <p className="feesIcon">ℹ️</p>
          <p className="feesText">
            All tracks carry a management fee of{' '}
            <em className="feesHighlight">0.5% of your monthly contribution</em>.
            This is deducted automatically and visible in your monthly statement.
            Users may move between tracks at any time as their goals and confidence evolve.
          </p>
        </div>

        {/* Milestone timeline for selected track */}
        {activeTrack && (
          <div className="milestonesSection">
            <h3 className="milestonesTitle">
              Your milestone journey — {activeTrack.name}
            </h3>
            <MilestoneTimeline milestones={activeTrack.milestones} currentYear={1} />
          </div>
        )}

        {/* CTA */}
        <div className="tracksCtaStrip">
          <div>
            <h3>Run the numbers.</h3>
            <p>See how your chosen track plays out with real simulations.</p>
          </div>
          <div className="ctaButtons">
            <a href="/simlab" className="buttonGold">Go to Simulation Lab →</a>
            <a href="/snapshot" className="buttonOutlineWhite">Back to Snapshot</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default StrategyTracks;