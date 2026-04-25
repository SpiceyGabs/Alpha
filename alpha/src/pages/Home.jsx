// Home.jsx
// This file contains ONLY component structure and JavaScript logic.
// All visual styling lives in Home.css

import './Home.css';

// ─── Data ────────────────────────────────────────────────────────────────────
// These arrays live in the JSX file because they are data the component uses.
// If your app grows, move them into a separate data/homeData.js file and import.

const featureCards = [
  {
    id: 'snapshot',
    colorClass: 'featureCardRed',
    icon: '📊',
    title: 'Money Snapshot',
    description:
      'See your complete financial position at a glance — gross income, deductions, net salary, savings progress, and monthly cash flow.',
    linkLabel: 'View your snapshot →',
    href: '/snapshot',
  },
  {
    id: 'tracks',
    colorClass: 'featureCardGold',
    icon: '🏆',
    title: 'Strategy Tracks',
    description:
      'Choose your financial race strategy. From The Bystander to The Sprinter — structured pathways designed around your goals and risk tolerance.',
    linkLabel: 'Explore tracks →',
    href: '/tracks',
  },
  {
    id: 'simlab',
    colorClass: 'featureCardOrange',
    icon: '🔬',
    title: 'Simulation Lab',
    description:
      'Run real-world financial simulations. Rent vs buy, vehicle finance, investment comparisons — see the numbers before you commit.',
    linkLabel: 'Run a simulation →',
    href: '/simlab',
  },
  {
    id: 'learn',
    colorClass: 'featureCardMaroon',
    icon: '📖',
    title: 'Learn+',
    description:
      'Your financial glossary and explainer hub. Understand every term, concept, and calculation the platform uses — in plain language.',
    linkLabel: 'Start learning →',
    href: '/learn',
  },
];

const personas = [
  {
    id: 'vanessa',
    emoji: '👩🏾',
    name: 'Vanessa Gumede',
    role: 'Logistics Officer · Durban',
    salary: 'R38 000 pm',
  },
  {
    id: 'shakira',
    emoji: '👩🏽',
    name: 'Shakira Moosraf',
    role: 'General Practitioner · Johannesburg',
    salary: 'R70 000 pm',
  },
  {
    id: 'mpilo',
    emoji: '👨🏾',
    name: 'Mpilo Dlamini',
    role: 'Actuary · Midrand',
    salary: 'R66 000 pm',
  },
];

// Ticker text repeated so the CSS animation loops seamlessly
const tickerContent =
  '🏃 Start your financial marathon · Build wealth over time · Your first five years matter · Pace yourself for life · '.repeat(6);

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCard({ colorClass, icon, title, description, linkLabel, href }) {
  return (
    <article className={`featureCard ${colorClass}`}>
      <div className="featureIcon">{icon}</div>
      <h3 className="featureTitle">{title}</h3>
      <p className="featureDescription">{description}</p>
      <a href={href} className="featureLink">{linkLabel}</a>
    </article>
  );
}

function PersonaCard({ emoji, name, role, salary }) {
  return (
    <div className="personaCard">
      <div className="personaAvatar">{emoji}</div>
      <p className="personaName">{name}</p>
      <p className="personaRole">{role}</p>
      <p className="personaSalaryBadge">{salary}</p>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

function Home() {
  return (
    <div className="homePage">

      {/* ── Hero ── */}
      <section className="homeHero">
        <p className="heroBadge">
          ABSA NextGen Wealth Studio
        </p>
        <h1 className="heroTitle">
          Your first five years of{' '}
          <em className="heroTitleAccent">financial independence</em>.
        </h1>
        <p className="heroSubtitle">
          A life planner and financial simulator built for young South African
          professionals. Visualise, plan, and simulate your wealth-building
          journey — paced like a marathon, not a sprint.
        </p>
        <div className="heroButtons">
          <a href="/snapshot" className="buttonPrimary">Get started →</a>
          <a href="/tracks" className="buttonGhost">Explore tracks</a>
        </div>
      </section>

      {/* ── Marathon Ticker ── */}
      <div className="marathonStrip" aria-hidden="true">
        <p className="marathonTicker">{tickerContent}</p>
      </div>

      {/* ── Features ── */}
      <section className="featuresSection">
        <p className="sectionLabel">Core Features</p>
        <h2 className="sectionTitle">
          Everything you need to run your financial race.
        </h2>
        <div className="featureGrid">
          {featureCards.map((card) => (
            <FeatureCard key={card.id} {...card} />
          ))}
        </div>
      </section>

      {/* ── Motivational Quote ── */}
      <blockquote className="quoteBlock">
        <p className="quoteText">
          "The best time to train your wallet for a marathon was 20 years ago.
          The next best time is now."
        </p>
        <footer className="quoteAuthor">— ABSA NextGen Wealth Studio</footer>
      </blockquote>

      {/* ── Personas ── */}
      <section className="personaSection">
        <p className="sectionLabel">Built for people like</p>
        <h2 className="sectionTitle">
          South African professionals navigating their first five years.
        </h2>
        <div className="personaScroll">
          {personas.map((person) => (
            <PersonaCard key={person.id} {...person} />
          ))}
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <div className="homeFooterCta">
        <h2>Ready to start your marathon?</h2>
        <p>Build wealth that lasts. Pace yourself. Play the long game.</p>
        <a href="/snapshot" className="buttonPrimary">Get started for free →</a>
      </div>

    </div>
  );
}

export default Home;