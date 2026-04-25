import { Link } from 'react-router-dom';

function NextButton({ to, label = "Next" }) {
  return (
    <Link to={to} className="nextButton">
      {label}
    </Link>
  );
}

export default NextButton;