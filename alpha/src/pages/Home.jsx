// import { Link } from 'react-router-dom';
import '../Styling/Home.css';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';


const featureCards = [
  {
    id: 'snapshot',
    colorClass: 'featureCardRed',
    title: 'Money Snapshot',
    description:
      'See your complete financial position at a glance - gross income, deductions, net salary, savings progress, and monthly cash flow.',
    linkLabel: 'View your snapshot →',
    href: '/snapshot',
  },
  {
    id: 'tracks',
    colorClass: 'featureCardGold',
    title: 'Strategy Tracks',
    description:
      'Choose your financial race strategy. From The Bystander to The Sprinter - structured pathways designed around your goals and risk tolerance.',
    linkLabel: 'Explore tracks →',
    href: '/tracks',
  },
  {
    id: 'simlab',
    colorClass: 'featureCardOrange',
    title: 'Simulation Lab',
    description:
      'Run real-world financial simulations. Rent vs buy, vehicle finance, investment comparisons - see the numbers before you commit.',
    linkLabel: 'Run a simulation →',
    href: '/simlab',
  },
];
//     These were explemplar personas used to populate the alpha version of the home page. 
// const personas = [
//   {
//     id: 'vanessa',
//     name: 'Vanessa Gumede',
//     role: 'Logistics Officer · Durban',
//     salary: 'R38 000 pm',

//   },
//   {
//     id: 'shakira',
//     name: 'Shakira Moosraf',
//     role: 'General Practitioner · Johannesburg',
//     salary: 'R70 000 pm',
//   },
//   {
//     id: 'mpilo',
//     name: 'Mpilo Dlamini',
//     role: 'Actuary · Midrand',
//     salary: 'R66 000 pm',
//   },
// ];

function FeatureCard({ colorClass,title, description, linkLabel, href }) {
  return (
    <article className={`featureCard ${colorClass}`}>
          <h3 className="featureTitle">{title}</h3>
          <p className="featureDescription">{description}</p>
          <a href={href} className="featureLink">{linkLabel}</a>
    </article>
  );
}

function PersonaCard({ name, role, salary }) {
  return (
    <div className="personaCard"> 
      <p className="personaName">{name}</p>
      <p className="personaRole">{role}</p>
      <p className="personaSalaryBadge">{salary}</p>
    </div>
  );
}

function Home() {

  const {user} = useContext(UserContext);

  return (
    <div className="homePage">

      <section className="homeHero">
        <h1 className="heroBadge">
         Welcome back, {user?.name ? ` ${user.name}` : ' Investor'}
        </h1>
        <p className="heroTitle">
          Your first years of wealth-building, visualised and planned.</p>
        <p> Your journey continues today.</p>

        <p className="heroSubtitle">
          A life planner and financial simulator built for young South African
          professionals. Visualise, plan, and simulate your wealth-building
          journey- paced like a marathon, not a sprint.
        </p>

        <div className="heroButtons">
          <a href="/snapshot" className="buttonPrimary">Get started</a>
          <a href="/tracks" className="buttonGhost">Explore tracks</a>
        </div>
      </section>


      <div className="marathonStrip" aria-hidden="true">
        <p className="marathonLabel">Pace your financial marathon</p>
      </div>

  
      <section className="featuresSection">
        <p className="sectionLabel"> Marathon 101</p>
        <h2 className="sectionTitle">
          Everything you need to run your financial race.
        </h2>
        <div className="featureGrid">
          {featureCards.map((card) => (
            <FeatureCard key={card.id} {...card} />
          ))}
        </div>
      </section>

      <blockquote className="quoteBlock">
        <p className="quoteText">
          "The best time to train your wallet for a marathon was 20 years ago.
          The next best time is now."
        </p>
        <footer className="quoteAuthor"> -ABSA NextGen Wealth Studio- </footer>
      </blockquote>

      <section className="personaSection">
        <p className="sectionLabel">Built for people like</p>
        <h2 className="sectionTitle">
          South African professionals navigating their first five years.
        </h2>
        {/* <div className="personaScroll">
          {personas.map((person) => (
            <PersonaCard key={person.id} {...person} />
          ))}
        </div> */}
        
      </section>

      <div className="homeFooterCta">
        <h2>Ready to start your marathon?</h2>
        <p>Build wealth that lasts. Pace yourself. Play the long game.</p>
        <a href="/snapshot" className="buttonPrimary">Get started for free </a>
      </div>
   </div>
  );
}

export default Home;