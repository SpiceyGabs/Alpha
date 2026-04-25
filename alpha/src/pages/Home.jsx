import { Link } from "react-router-dom";
import NextButton from './components/NextButton.jsx';
import './App.css';
import './index.css';

function Home() {
  return (
    <div className="home">
      <h1>ABSA NextGen Wealth Studio</h1>

      <p>
        Welcome to your first five years of financial independence. 
        This tool helps you visualise, plan, and simulate your wealth-building journey. 
        It's designed specifically for you; a young, South African professional.
      </p>

      <p>
        Use the Money Snapshot to see your current position, explore Strategy Tracks to find your financial marathon pace,
        and run simulations to compare major decisions like renting vs buying.
      </p>

      {/* Nextttttt buttttttoonnn lets ggaaauuurrr!!!!!!!! */}
      <NextButton to="/snapshot" label="Get started >" />
    </div>

  );

}

export default Home;