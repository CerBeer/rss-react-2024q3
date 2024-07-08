import spinner from "../assets/spinner.gif";

function Spinner() {
  return (
    <div className="spinner">
      <img className="spinner-img" src={spinner} alt="loading..." />
    </div>
  );
}

export default Spinner;
