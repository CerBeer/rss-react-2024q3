/* eslint-disable @next/next/no-img-element */
import spinner from "../../assets/spinner.gif";

function Spinner() {
  return (
    <div className="spinner" data-testid="spinner">
      <img className="spinner-img" src={spinner.src} alt="loading..." />
    </div>
  );
}

export default Spinner;
